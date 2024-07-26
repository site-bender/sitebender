import { INTEGER_MATCHER } from "../../constants"

const isInteger = value => INTEGER_MATCHER.test(String(value))

export default isInteger
