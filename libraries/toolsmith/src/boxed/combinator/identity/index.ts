import liftUnary from "../../lift/liftUnary/index.ts"
import vanillaIdentity from "../../../vanilla/combinator/identity/index.ts"

//++ Boxed version of identity that works with Result/Validation monads
const identity = liftUnary(vanillaIdentity)

export default identity
