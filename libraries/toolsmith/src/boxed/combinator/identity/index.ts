import vanillaIdentity from "../../../vanilla/combinator/identity/index.ts"
import liftUnary from "../../lift/liftUnary/index.ts"

//++ Identity function lifted to work with Result/Validation monads
//++ Returns its argument unchanged
const identity = liftUnary(vanillaIdentity)


export default identity
