import liftBinary from "../../lift/liftBinary/index.ts"
import vanillaTest from "../../../vanilla/string/test/index.ts"

//++ Boxed version of test that works with Result/Validation monads
const test = liftBinary(vanillaTest)

export default test
