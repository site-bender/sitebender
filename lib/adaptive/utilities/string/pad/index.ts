import repeat from "../repeat.js"

const pad = (chars) => (times) => (str) =>
	`${repeat(chars)(times)}${str}${repeat(chars)(times)}`

export default pad
