import vanillaCharCodeAt from "../../../vanilla/string/charCodeAt/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of charCodeAt that works with Result/Validation monads
const charCodeAt = liftBinary(vanillaCharCodeAt)

export default charCodeAt
