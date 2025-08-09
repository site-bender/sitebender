import repeat from "../repeat.js"

const padEndTo = (chars) => (length) => (str) =>
	`${repeat(chars)(str.length >= length ? 0 : length - str.length)}${str}`

export default padEndTo
