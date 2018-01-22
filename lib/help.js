const { COLOR_BRIGHT, COLOR_DIM, colorize } = require('./helpers/colors')

// prettier-ignore
const getHelp = () => [
  `Usage: ${colorize('hrs', COLOR_BRIGHT)}               ${colorize('Show overview', COLOR_DIM)}`,
  `       ${colorize('hrs break', COLOR_BRIGHT)}         ${colorize('Start a break', COLOR_DIM)}`,
  `       ${colorize('hrs note', COLOR_BRIGHT)} <note>   ${colorize('Add note to current time', COLOR_DIM)}`,
  `       ${colorize('hrs start', COLOR_BRIGHT)} <hh:mm> ${colorize('Change start time of the day', COLOR_DIM)}`
].join('\n')

module.exports = {
  getHelp
}
