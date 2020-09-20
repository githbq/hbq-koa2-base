 
demo1

``` ts
 describe('module-poilerplate: index', () => {
  const mocks = {
    files: {
      yourModule: { run: jest.fn() }
    }
  }

  beforeAll(() => {
    jest.mock('../yourModule', () => function yourModule() {
      return { run: mocks.files.yourModule.run }
    })
  })

  test('运行脚手架，调用run方法', () => {
    require('../index')

    expect(mocks.files.yourModule.run).toHaveBeenCalled()
  })
})

```

demo2

``` ts
/* eslint global-require: 0, no-sync: 0 */
describe.skip('@hufe/mobile-core: webpack-config/index', () => {
  const mocks = {
    hufe: {
      scaffoldCore: {
        matchConfig: jest.fn()
      }
    },
    files: {
      webConfig: jest.fn(),
      weexConfig: jest.fn(),
      nodeConfig: jest.fn(),
      widgetWebConfig: jest.fn(),
      widgetWeexConfig: jest.fn(),
      widgetNodeConfig: jest.fn(),
      extensionNodeConfig: jest.fn()
    }
  }

  beforeAll(() => {
    jest.mock('@hufe/scaffold-core', () => mocks.hufe.scaffoldCore)
    jest.mock('../webpack-config/WebConfig', () => mocks.files.webConfig)
    jest.mock('../webpack-config/WeexConfig', () => mocks.files.weexConfig)
    jest.mock('../webpack-config/NodeConfig', () => mocks.files.nodeConfig)
    jest.mock('../webpack-config/WidgetWebConfig', () => mocks.files.widgetWebConfig)
    jest.mock('../webpack-config/WidgetWeexConfig', () => mocks.files.widgetWeexConfig)
    jest.mock('../webpack-config/WidgetNodeConfig', () => mocks.files.widgetNodeConfig)
    jest.mock('../webpack-config/ExtensionNodeConfig', () => mocks.files.extensionNodeConfig)
  })

  beforeEach(() => {
    process.env.NODE_ENV = ''
  })

  test('导出的功能', () => {
    const webpackConfig = require('../webpack-config')

    expect(webpackConfig).toEqual({
      get: expect.any(Function)
    })
  })

  describe('get方法', () => {
    const config = {}

    test('NODE_ENV 为空时，matchConfig 被调用且参数正确', () => {
      const webpackConfig = require('../webpack-config')

      webpackConfig.get(config)

      expect(mocks.hufe.scaffoldCore.matchConfig).toHaveBeenCalledWith({
        pages: [
          mocks.files.nodeConfig,
          mocks.files.webConfig,
          mocks.files.weexConfig
        ],
        widgets: [
          mocks.files.widgetNodeConfig,
          mocks.files.widgetWebConfig,
          mocks.files.widgetWeexConfig
        ],
        extensions: [
          mocks.files.extensionNodeConfig
        ]
      }, {
        config: {},
        isDev: true,
        buildEnv: 'local'
      })
    })

    test('NODE_ENV 为 production 时，matchConfig 被调用且参数正确', () => {
      process.env.NODE_ENV = 'production'
      process.env.hufe_BUILD_ENV = ''

      const webpackConfig = require('../webpack-config')

      webpackConfig.get(config)

      expect(mocks.hufe.scaffoldCore.matchConfig).toHaveBeenCalledWith({
        pages: [
          mocks.files.nodeConfig,
          mocks.files.webConfig,
          mocks.files.weexConfig
        ],
        widgets: [
          mocks.files.widgetNodeConfig,
          mocks.files.widgetWebConfig,
          mocks.files.widgetWeexConfig
        ],
        extensions: [
          mocks.files.extensionNodeConfig
        ]
      },
        {
          config: {},
          isDev: false,
          buildEnv: 'production'
        })
    })
  })
})

```
