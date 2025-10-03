import vanillaHead from "../../../vanilla/array/head/index.ts"
import liftUnary from "../../lift/liftUnary/index.ts"

//++ Boxed version of head that works with Result/Validation monads
const head = liftUnary(vanillaHead)

export default head
