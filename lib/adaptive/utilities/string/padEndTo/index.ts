import repeat from "../repeat.js"

const padEndTo = (chars) => (length) => (str) =>
	`${str}${repeat(chars)(str.length >= length ? 0 : length - str.length)}`

export default padEndTo
