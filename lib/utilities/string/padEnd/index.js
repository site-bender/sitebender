import repeat from "../repeat"

const padEnd = chars => times => str => `${str}${repeat(chars)(times)}`

export default padEnd
