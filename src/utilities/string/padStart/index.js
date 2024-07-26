import repeat from "../repeat"

const padStart = chars => times => str => `${repeat(chars)(times)}${str}`

export default padStart
