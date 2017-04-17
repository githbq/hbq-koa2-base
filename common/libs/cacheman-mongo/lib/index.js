'use strict';

/**
 * Module dependencies.
 */

import { MongoClient } from 'mongodb';
import uri from 'mongodb-uri';
import thunky from 'thunky';
import zlib from 'zlib';

/**
 * Module constants.
 */

const noop = () => {};

export default class MongoStore {

  /**
   * MongoStore constructor.
   *
   * @param {Object} options
   * @api public
   */

  constructor(conn, options = {}) {

    let store = this;

    if ('object' === typeof conn) {
      if ('function' !== typeof conn.collection) {
        options = conn;
        if (Object.keys(options).length === 0) {
          conn = null;
        } else if (options.client) {
          this.client = options.client
        } else {
          options.database = options.database || options.db;
          options.hosts = options.hosts || [{
            port: options.port || 27017,
            host: options.host || '127.0.0.1'
          }];
          conn = uri.format(options);
        }
      } else {
        this.client = conn;
      }
    }

    conn = conn || 'mongodb://127.0.0.1:27017';
    var coll = this.coll = options.collection || 'cacheman';
    this.compression = options.compression || false;
    this.ready = thunky((cb) => {

      function createIndex(err, db) {
        db.ensureIndex(coll, { 'expireAt': 1 }, { expireAfterSeconds: 0 }, err => {
          cb(err, db);
        });
      }

      if ('string' === typeof conn) {
        MongoClient.connect(conn, options, (err, db) => {
          if (err) return cb(err);
          createIndex(null, this.client = db);
          db.ensureIndex(coll, { 'expireAt': 1 }, { expireAfterSeconds: 0 }, err => {
            cb(err, db);
          });
        });
      } else {
        if (this.client) return createIndex(null, this.client);
        cb(new Error('Invalid mongo connection.'));
      }
    });

  }

  /**
   * Get an entry.
   *
   * @param {String} key
   * @param {Function} fn
   * @api public
   */

  get(key, fn = noop) {
    this.ready((err, db) => {
      if (err) return fn(err);
      db.collection(this.coll).findOne({ key: key }, (err, data) => {
        if (err) return fn(err);
        if (!data) return fn(null, null);
        //Mongo's TTL might have a delay, to fully respect the TTL, it is best to validate it in get.
        if (data.expireAt.getTime() < Date.now()) {
          this.del(key);
          return fn(null, null);
        }
        try {
          if (data.compressed) return decompress(data.value, fn);
          fn(null, data.value);
        } catch (err) {
          fn(err);
        }
      });
    });
  }

  /**
   * Set an entry.
   *
   * @param {String} key
   * @param {Mixed} val
   * @param {Number} ttl
   * @param {Function} fn
   * @api public
   */

  set(key, val, ttl, fn = noop) {

    if ('function' === typeof ttl) {
      fn = ttl;
      ttl = null;
    }

   let data;
   let store = this;
   let query = { key: key };
   let options = { upsert: true, safe: true };

    try {
      data = {
        key: key,
        value: val,
        expireAt: new Date(Date.now() + ((ttl || 60) * 1000))
      };
    } catch (err) {
      return fn(err);
    }

    this.ready((err, db) => {
      if (err) return fn(err);
      if (!this.compression) {
        update(data);
      } else {
        compress(data, function compressData(err, data) {
          if (err) return fn(err);
          update(data);
        });
      }
      function update(data) {
        db.collection(store.coll).update(query, data, options, (err, data) => {
          if (err) return fn(err);
          if (!data) return fn(null, null);
          fn(null, val);
        });
      }
    });
  }

  /**
   * Delete an entry.
   *
   * @param {String} key
   * @param {Function} fn
   * @api public
   */

  del(key, fn = noop) {
    this.ready((err, db) => {
      if (err) return fn(err);
      db.collection(this.coll).remove({ key: key }, { safe: true }, fn);
    });
  }

  /**
   * Clear all entries for this bucket.
   *
   * @param {Function} fn
   * @api public
   */

  clear(fn = noop) {
    this.ready((err, db) => {
      if (err) return fn(err);
      db.collection(this.coll).remove({}, { safe: true }, fn);
    });
  }
}

/**
 * Non-exported Helpers
 */

/**
 * Compress data value.
 *
 * @param {Object} data
 * @param {Function} fn
 * @api public
 */

function compress(data, fn) {
  // Data is not of a "compressable" type (currently only Buffer)
  if (!Buffer.isBuffer(data.value)) return fn(null, data);

  zlib.gzip(data.value, (err, val) => {
    // If compression was successful, then use the compressed data.
    // Otherwise, save the original data.
    if (!err) {
      data.value = val;
      data.compressed = true;
    }
    fn(err, data);
  });
};

/**
 * Decompress data value.
 *
 * @param {Object} value
 * @param {Function} fn
 * @api public
 */

function decompress(value, fn){
  let v = (value.buffer && Buffer.isBuffer(value.buffer)) ? value.buffer : value;
  zlib.gunzip(v, fn);
};
