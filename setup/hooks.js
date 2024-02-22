const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  AfterStep
} = require('@cucumber/cucumber')
const CONFIG_DATA = require('./configData')
const { initializeBrowser } = require('./init')
const allure = require('allure-js-commons')
const { setDefaultTimeout } = require('@cucumber/cucumber')
const { getRunId, updateTestCase } = require('../utils/testrailUtils')
const fs = require('fs').promises

const TEST_RUN_NAME = process.env.runname

setDefaultTimeout(CONFIG_DATA.default_timeout * 1000)
let step = 0
let testStatusContent
let runId

BeforeAll(async function () {
  // Launch browser
  global.page = await initializeBrowser()
  await global.page.maximizeWindow()
  try {
    runId = await getRunId(TEST_RUN_NAME)
  } catch (err) {
    runId = 'failed'
    console.log('Error: ' + err)
  }
})
Before(async function () {
  // write before logic here
})

AfterAll(async function () {
  await global.page.deleteSession()
})

After(async function (Scenario) {
  if (runId !== 'failed') {
    try {
      if (Scenario.result.status === 'PASSED') {
        testStatusContent = {
          comment: 'working as expected',
          status_id: 1
        }
      } else {
        testStatusContent = {
          comment: Scenario.result.exception.message,
          status_id: 5
        }
      }
      const testCaseId = Scenario.pickle.tags[0].name.slice(2)
      await updateTestCase(runId, testCaseId, testStatusContent)
    } catch (err) {
      console.log('Error ' + err)
    }
  }
})

AfterStep(async function (Scenario) {
  step++
  if (Scenario.result.status === 'FAILED') {
    const screenshotPath = `reports/screenshots/step-${step}.png`
    const screenshotsFolder = './reports/screenshots'
    await fs.mkdir(screenshotsFolder, { recursive: true })
    const screenshot = await global.page.saveScreenshot(screenshotPath)
    await this.attach(screenshot, 'image/png')
    await allure.attachment(
      'Screenshot',
      Buffer.from(screenshot, 'base64'),
      'image/png'
    )
  }
})
