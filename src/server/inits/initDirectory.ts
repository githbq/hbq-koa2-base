export default {
      init(app, { debug }) {
          const { ioHelper } = appUtils.requireCommon()
          const dir = APP_CONFIG.uploadPath 
          //待初始化路径 
          let initDirs = [dir] 
          initDirs.forEach((dir) => {
              ioHelper.exists(dir).then((exists) => {
                  if (!exists) {
                      return ioHelper.makeDir(dir)
                  }
              }).then(() => {
                  debug(`directory:${dir} OK.`)
              })
          })
      }
  }