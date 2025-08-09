import repeat from "../repeat.js"

const padEnd = (chars) => (times) => (str) => `${str}${repeat(chars)(times)}`

export default padEnd
