#!/usr/bin/env node

require('../lib/install').install()

const { WORK_HOURS } = require('../lib/config')

const addHours = require('date-fns/add_hours')
const setHours = require('date-fns/set_hours')
const setMinutes = require('date-fns/set_minutes')

const { addEntry, getData, saveData } = require('../lib/data')
const { getHelp } = require('../lib/help')
const { getOverview } = require('../lib/overview')

const [, , command, ...args] = process.argv

switch (command) {
  case 'break': {
    addEntry({ type: 'break' })
    const data = getData()
    console.log(getOverview(data))
    break
  }

  case 'note': {
    const data = addEntry({ type: 'note', note: args.join(' ') })
    console.log(getOverview(data))
    break
  }

  case 'start': {
    const [hours, minutes] = args[0].split(':')
    const data = getData()
    const newData = {
      ...data,
      startTime: setMinutes(setHours(data.startTime, hours), minutes),
      endTime: addHours(data.startTime, WORK_HOURS)
    }
    saveData(newData)
    console.log(getOverview(newData))
    break
  }

  case 'help':
  case '-?':
  case '--help': {
    console.log(`\n${getHelp()}\n`)
    break
  }

  default: {
    const data = getData()
    console.log(getOverview(data))
    break
  }
}

process.exit(0)
