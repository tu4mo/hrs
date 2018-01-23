const COLOR_BRIGHT = '1'
const COLOR_DIM = '2'

const colorize = (text, color) => `\x1b[${color}m${text}\x1b[0m`

const brighten = text => colorize(text, COLOR_BRIGHT)
const dim = text => colorize(text, COLOR_DIM)

module.exports = {
  COLOR_BRIGHT,
  COLOR_DIM,
  brighten,
  colorize,
  dim
}
