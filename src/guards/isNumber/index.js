import { NUMBER_MATCHER } from "../../constants"

const isNumber = value => NUMBER_MATCHER.test(String(value))

export default isNumber
