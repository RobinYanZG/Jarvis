export const translate = (str: string): string => unescape(str.replace(/\\u/g, '%u'))
export const getNumberFromString = (str: string): number => {
  const number = parseInt(str.replace(/[^0-9]/ig, ''), 10)
  if (Number.isNaN(number)) {
    return 0
  }

  return number
}

export default {}
