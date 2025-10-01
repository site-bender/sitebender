import liftUnary from "../../lift/liftUnary/index.ts"
import vanillaTail from "../../../vanilla/array/tail/index.ts"

//++ Boxed version of tail that works with Result/Validation monads
const tail = liftUnary(vanillaTail)

export default tail
