import vanillaMultiply from "../../../vanilla/math/multiply/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of multiply that works with Result/Validation monads
//++ Defaults to Result for plain values, Validation if any input is Validation
const multiply = liftBinary(vanillaMultiply)
export default multiply
