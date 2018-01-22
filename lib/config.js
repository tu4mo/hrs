const os = require('os')
const path = require('path')

const HOME_DIR = path.join(os.homedir(), '.hrs')
const WORK_HOURS = 8

module.exports = {
  HOME_DIR,
  WORK_HOURS
}
