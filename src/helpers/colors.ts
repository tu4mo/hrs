export const COLOR_BRIGHT = '1'
export const COLOR_DIM = '2'

export const colorize = (text: string, color: string) =>
  `\x1b[${color}m${text}\x1b[0m`

export const brighten = (text: string) => colorize(text, COLOR_BRIGHT)
export const dim = (text: string) => colorize(text, COLOR_DIM)
