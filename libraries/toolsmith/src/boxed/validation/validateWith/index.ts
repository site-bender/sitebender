import vanillaValidateWith from "../../../vanilla/validation/validateWith/index.ts"
import liftTernary from "../../lift/liftTernary/index.ts"

//++ Boxed version of validateWith that works with Result/Validation monads
const validateWith = liftTernary(vanillaValidateWith)

export default validateWith
