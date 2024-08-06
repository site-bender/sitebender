import { MULTIPLICATION_IDENTITY } from "../../../../operations/constants"
import reduce from "../"

const multiply = reduce((a, b) => a * b)(MULTIPLICATION_IDENTITY)

export default multiply
