'use strict';

/**
 * Module dependencies.
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) { return typeof obj; } : function(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function() {
    function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor); } } return function(Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = require('mongodb');

var _mongodbUri = require('mongodb-uri');

var _mongodbUri2 = _interopRequireDefault(_mongodbUri);

var _thunky = require('thunky');

var _thunky2 = _interopRequireDefault(_thunky);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Module constants.
 */

var noop = function noop() {};

var MongoStore = function() {

    /**
     * MongoStore constructor.
     *
     * @param {Object} options
     * @api public
     */

    function MongoStore(conn) {
        var _this = this;

        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, MongoStore);

        var store = this;

        if ('object' === (typeof conn === 'undefined' ? 'undefined' : _typeof(conn))) {
            if ('function' !== typeof conn.collection) {
                options = conn;
                if (Object.keys(options).length === 0) {
                    conn = null;
                } else if (options.client) {
                    this.client = options.client;
                } else {
                    options.database = options.database || options.db;
                    options.hosts = options.hosts || [{
                        port: options.port || 27017,
                        host: options.host || '127.0.0.1'
                    }];
                    conn = _mongodbUri2.default.format(options);
                }
            } else {
                this.client = conn;
            }
        }

        conn = conn || 'mongodb://127.0.0.1:27017';
        var coll = this.coll = options.collection || 'cacheman';
        //add by hbq   
        delete options.collection;
        //end by hbq
        this.compression = options.compression || false;
        this.ready = (0, _thunky2.default)(function(cb) {

            function createIndex(err, db) {
                db.ensureIndex(coll, { 'expireAt': 1 }, { expireAfterSeconds: 0 }, function(err) {
                    cb(err, db);
                });
            }

            if ('string' === typeof conn) {
                _mongodb.MongoClient.connect(conn, options, function(err, db) {
                    if (err) return cb(err);
                    createIndex(null, _this.client = db);
                    db.ensureIndex(coll, { 'expireAt': 1 }, { expireAfterSeconds: 0 }, function(err) {
                        cb(err, db);
                    });
                });
            } else {
                if (_this.client) return createIndex(null, _this.client);
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

    _createClass(MongoStore, [{
        key: 'get',
        value: function get(key) {
            var _this2 = this;

            var fn = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];

            this.ready(function(err, db) {
                if (err) return fn(err);
                db.collection(_this2.coll).findOne({ key: key }, function(err, data) {
                    if (err) return fn(err);
                    if (!data) return fn(null, null);
                    //Mongo's TTL might have a delay, to fully respect the TTL, it is best to validate it in get.
                    if (data.expireAt.getTime() < Date.now()) {
                        _this2.del(key);
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

    }, {
        key: 'set',
        value: function set(key, val, ttl) {
            var _this3 = this;

            var fn = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];

            if ('function' === typeof ttl) {
                fn = ttl;
                ttl = null;
            }

            var data = undefined;
            var store = this;
            var query = { key: key };
            var options = { upsert: true, safe: true };

            try {
                data = {
                    key: key,
                    value: val,
                    expireAt: new Date(Date.now() + (ttl || 60) * 1000)
                };
            } catch (err) {
                return fn(err);
            }

            this.ready(function(err, db) {
                if (err) return fn(err);
                if (!_this3.compression) {
                    update(data);
                } else {
                    compress(data, function compressData(err, data) {
                        if (err) return fn(err);
                        update(data);
                    });
                }

                function update(data) {
                    db.collection(store.coll).update(query, data, options, function(err, data) {
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

    }, {
        key: 'del',
        value: function del(key) {
            var _this4 = this;

            var fn = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];

            this.ready(function(err, db) {
                if (err) return fn(err);
                db.collection(_this4.coll).remove({ key: key }, { safe: true }, fn);
            });
        }

        /**
         * Clear all entries for this bucket.
         *
         * @param {Function} fn
         * @api public
         */

    }, {
        key: 'clear',
        value: function clear() {
            var _this5 = this;

            var fn = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];

            this.ready(function(err, db) {
                if (err) return fn(err);
                db.collection(_this5.coll).remove({}, { safe: true }, fn);
            });
        }
    }]);

    return MongoStore;
}();

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

exports.default = MongoStore;

function compress(data, fn) {
    // Data is not of a "compressable" type (currently only Buffer)
    if (!Buffer.isBuffer(data.value)) return fn(null, data);

    _zlib2.default.gzip(data.value, function(err, val) {
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

function decompress(value, fn) {
    var v = value.buffer && Buffer.isBuffer(value.buffer) ? value.buffer : value;
    _zlib2.default.gunzip(v, fn);
};
module.exports = exports['default'];