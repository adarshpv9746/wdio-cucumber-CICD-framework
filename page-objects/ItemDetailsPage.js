class ItemDetails {
  constructor (page) {
    this.page = page
    this.itemNamel = page.$('.name')
  }

  async getItemTitle () {
    this.itemName = this.itemNamel.getText()
    return this.itemName
  }
}
module.exports = { ItemDetails }
