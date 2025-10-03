import vanillaCharAt from "../../../vanilla/string/charAt/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of charAt that works with Result/Validation monads
const charAt = liftBinary(vanillaCharAt)

export default charAt
