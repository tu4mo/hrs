#!/usr/bin/env node

import * as path from 'path'

import { install } from './lib/install'
install()

import { HOME_DIR, WORK_HOURS } from './lib/config'
import { getHelp } from './lib/help'
import { getOverview } from './lib/overview'

import Day from './models/Day'

import { note } from './commands/note'
import { start } from './commands/start'

const commands: { [key: string]: (day: Day, args: string[]) => void } = {
  note,
  start
}

const [, , command = '', ...args] = process.argv

const day = new Day({
  date: new Date(),
  path: path.resolve(HOME_DIR, 'data'),
  workHours: WORK_HOURS
})

if (commands[command]) {
  commands[command](day, args)
} else if (command === '') {
  console.log(getOverview(day))
} else {
  console.log(`\n${getHelp()}\n`)
}

process.exit(0)
