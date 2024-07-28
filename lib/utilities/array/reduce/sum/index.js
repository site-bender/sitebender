import { ADDITION_IDENTITY } from "../../../../calculations/constants"
import reduce from "../"

const sum = reduce((a, b) => a + b)(ADDITION_IDENTITY)

export default sum
