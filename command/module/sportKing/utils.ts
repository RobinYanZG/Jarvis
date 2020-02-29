export const translate = (str: string): string => unescape(str.replace(/\\u/g, '%u'))

export default {}
