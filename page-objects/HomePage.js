class HomePage {
  constructor (page) {
    this.page = page
    this.item = page.$('.card-title a')
    this.homeLoginButton = page.$('#login2')
    this.loggedInUserName = page.$('//a[@id="nameofuser"]')
    this.userNameModal = page.$('[role="dialog"]')
    this.username = page.$('#loginusername')
    this.password = page.$('#loginpassword')
    this.loginButton = page.$('//button[@onclick="logIn()"]')
    this.closeButton = page.$('text=Close')
    this.ordersButton = page.$('button[routerlink="/dashboard/myorders"]')
    this.ordersListTitle = page.$('h1.ng-star-inserted')
  }

  /**
   * Opens the application web page
   * @param {string} appUrl
   */
  async openHomePage (appUrl) {
    await this.page.url(appUrl)
  }

  async clickLogin () {
    await this.homeLoginButton.click()
  }

  async enterLoginCredentials (username, password) {
    await this.username.waitForDisplayed()
    await this.username.click()
    await this.username.setValue(username)
    await this.password.click()
    await this.password.setValue(password)
  }

  async clickLoginButton () {
    await this.loginButton.click()
  }

  async getItemText () {
    const itemText = this.item.getText()
    return itemText
  }

  async clickOnFirstItem () {
    await this.item.click()
  }

  async getLoggedInUserName () {
    // await this.page.waitForLoadState('networkidle')
    await this.loggedInUserName.waitForDisplayed()
    const userName = await this.loggedInUserName.getText()
    return userName
  }

  async closeDialog () {
    await this.page.on('login dialog popup', (dialog) => {
      this.closeButton.click()
    })
  }

  /**
   * Opens the application web page
   * @param {string} appUrl
   */
  async navigateToHomePage (appUrl) {
    this.page.execute((value) => {
      window.localStorage.setItem('token', value)
    }, global.token)
    await this.page.url(appUrl)
  }

  async clickOrders () {
    await this.ordersButton.click()
  }

  async verifyOrders () {
    return await this.ordersListTitle.getText()
  }
}

module.exports = { HomePage }
