import repeat from "../repeat"

const pad = chars => times => str =>
	`${repeat(chars)(times)}${str}${repeat(chars)(times)}`

export default pad
