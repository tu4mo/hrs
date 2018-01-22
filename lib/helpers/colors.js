const COLOR_BRIGHT = '1'
const COLOR_DIM = '2'

const colorize = (text, color) => `\x1b[${color}m${text}\x1b[0m`

module.exports = {
  COLOR_BRIGHT,
  COLOR_DIM,
  colorize
}
