import repeat from "../repeat.js"

const padStart = (chars) => (times) => (str) => `${repeat(chars)(times)}${str}`

export default padStart
