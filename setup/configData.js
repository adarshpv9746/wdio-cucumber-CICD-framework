/**
 * Data values required to launch the application
 */
const CONFIG_DATA = {
  browserName: process.env.browser,
  parallel: 1,
  headlessMode: true,
  device: '',
  default_timeout: 30, // seconds
  // smtp_username and password must be base 64 encrypted
  // Note: If 2FA is enabled, you should use app-password else you can use gmail login password
  smtp_username: 'base64username==',
  smtp_pass: 'base64pass==',
  testrail_username: 'YWRhcnNodmlqYXlhbkBxYnVyc3QuY29t',
  testrail_password: 'ZXJTV0tHTkNaaU1MQTByT29nNHItYTMxclBNNC5DTjVGcXV0MXlPem4=',
  testrail_url: 'https://adarshqburst123.testrail.io',
  testrail_projectid: 1
}

module.exports = CONFIG_DATA
