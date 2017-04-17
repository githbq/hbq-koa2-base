  const dir = APP_CONFIG.uploadPath;
  //待初始化路径 
  let initDirs = [dir];
  export default {
      init(app, { debug }) {
          initDirs.forEach((dir) => {
              const ioHelper = appUtils.requireCommon('ioHelper');
              const exists = ioHelper.existsSync(dir);
              if (!exists) {
                  ioHelper.mkdir(dir).then(() => {
                      debug(`directory:${dir} OK.`);
                  });
              } else {
                  debug(`directory:${dir} OK.`);
              }
          });
      }
  };