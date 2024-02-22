const ObjectHandler = require('../page-objects/ObjectHandler')
// const { chromium, firefox, webkit } = require('playwright')
const CONFIG_DATA = require('./configData')
const { remote } = require('webdriverio')

/**
 * Func to create and initialise object handler of the application
 * @returns {object}
 */
const obInit = function () {
  const poHandler = new ObjectHandler(global.page)
  return poHandler
}

/**
 * Func to check the browser choice and get the playwright's browser type
 * @returns {object}
 */
async function getBrowserType () {
  let browserType
  if (CONFIG_DATA.browserName === undefined) {
    browserType = 'chrome'
  } else {
    switch (CONFIG_DATA.browserName.toLowerCase()) {
      case 'chrome':
        browserType = 'chrome'
        break
      case 'firefox':
        browserType = 'firefox'
        break
      case 'edge':
        browserType = 'edge'
        break
      case 'safari':
        browserType = 'safari'
        break
      default:
        browserType = 'chrome'
    }
  }
  return browserType
}

async function initializeBrowser () {
  const headlessMode = CONFIG_DATA.headlessMode ? ['--headless'] : []
  const device = CONFIG_DATA.device ? { deviceName: CONFIG_DATA.device } : {}
  const browserType = await getBrowserType()
  const options = {
    maxInstances: CONFIG_DATA.parallel,
    capabilities: {
      browserName: browserType,
      browserVersion: 'latest',
      'goog:chromeOptions': {
        mobileEmulation: device,
        args: [
          ...headlessMode,
          'disable-gpu',
          '--start-maximized',
          '--no-sandbox'
        ]
      },
      'moz:firefoxOptions': {
        args: [...headlessMode]
      },
      'ms:edgeOptions': {
        mobileEmulation: device,
        args: [
          ...headlessMode,
          'disable-gpu',
          '--start-maximized',
          '--no-sandbox'
        ]
      },
      timeouts: {
        pageLoad: CONFIG_DATA.default_timeout * 1000
      }
    }
  }

  const browser = await remote(options)
  return browser
}

module.exports = { obInit, getBrowserType, initializeBrowser }
