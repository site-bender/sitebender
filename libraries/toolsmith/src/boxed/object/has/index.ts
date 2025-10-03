import vanillaHas from "../../../vanilla/object/has/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of has that works with Result/Validation monads
const has = liftBinary(vanillaHas)

export default has
