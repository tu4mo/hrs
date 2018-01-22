const fs = require('fs')
const path = require('path')

const { HOME_DIR } = require('./config')

const createFolder = path => {
  if (fs.existsSync(path)) return

  try {
    fs.mkdirSync(path)
  } catch (err) {
    throw err
  }
}

const install = () => {
  try {
    createFolder(HOME_DIR)
    createFolder(path.resolve(HOME_DIR, 'data'))
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = {
  install
}
