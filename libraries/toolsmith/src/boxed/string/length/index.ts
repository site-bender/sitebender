import liftUnary from "../../lift/liftUnary/index.ts"
import vanillaLength from "../../../vanilla/string/length/index.ts"

//++ Boxed version of length that works with Result/Validation monads
const length = liftUnary(vanillaLength)

export default length
