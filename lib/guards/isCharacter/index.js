import isString from "../isString"

const isCharacter = value => isString(value) && value.length === 1

export default isCharacter
