import vanillaNegate from "../../../vanilla/math/negate/index.ts"
import liftUnary from "../../lift/liftUnary/index.ts"

//++ Boxed version of negate that works with Result/Validation monads
const negate = liftUnary(vanillaNegate)

export default negate
