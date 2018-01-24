import * as fs from 'fs'
import * as path from 'path'

import { HOME_DIR } from './config'

const createFolder = (folderPath: string) => {
  if (fs.existsSync(folderPath)) {
    return
  }

  try {
    fs.mkdirSync(folderPath)
  } catch (err) {
    throw err
  }
}

export const install = () => {
  try {
    createFolder(HOME_DIR)
    createFolder(path.resolve(HOME_DIR, 'data'))
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}
