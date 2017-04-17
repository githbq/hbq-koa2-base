  import mkdirp from 'mkdirp-promise';
  import fsp from 'fs-promise';
  const dir = APP_CONFIG.uploadPath;
  //待初始化路径 
  let initDirs = [dir];
  export default {
      init(app, { debug }) {
          initDirs.forEach((dir) => {
              const exists = fsp.existsSync(dir);
              if (!exists) {
                  mkdirp(dir).then(() => {
                      debug(`directory:${dir} OK.`);
                  });
              } else {
                  debug(`directory:${dir} OK.`);
              }
          });
      }
  };