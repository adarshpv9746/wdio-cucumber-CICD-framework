const CryptoJS = require('crypto-js')

const valueToEncrypt = process.argv[2]
const secretKey = process.argv[3]

if (!valueToEncrypt || !secretKey) {
  console.error(
    'Please provide both the value and secret key as command line arguments.'
  )
  console.error(
    'usage: `` node encrypt.js "Type the value to Encrypt" "Type the secret Key" `` or'
  )
  console.error(
    'usage: `` npm run encrypt "Type the value to Encrypt" "Type the secret Key" ``'
  )
  process.exit(1)
}

// Encrypt the userName and Password with Secret Key
const encryptedValue = CryptoJS.AES.encrypt(
  valueToEncrypt,
  secretKey
).toString()
// Please Update the below encrypted username and password in Config File(tst.json file)
console.log('Encrypted Value:', encryptedValue)
