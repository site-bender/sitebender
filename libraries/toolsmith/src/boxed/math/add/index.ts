import vanillaAdd from "../../../vanilla/math/add/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of add that works with Result/Validation monads
//++ Defaults to Result for plain values, Validation if any input is Validation
const add = liftBinary(vanillaAdd)
export default add
