import { brighten, dim } from '../helpers/colors'

// prettier-ignore
export const getHelp = () => [
  `Usage: ${brighten('hrs')}               ${dim('Show overview')}`,
  `       ${brighten('hrs break')}         ${dim('Start a break')}`,
  `       ${brighten('hrs note')} <note>   ${dim('Add note to current time')}`,
  `       ${brighten('hrs start')} <hh:mm> ${dim('Change start time of the day')}`
].join('\n')
