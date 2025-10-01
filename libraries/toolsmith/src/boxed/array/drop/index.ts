import liftBinary from "../../lift/liftBinary/index.ts"
import vanillaDrop from "../../../vanilla/array/drop/index.ts"

//++ Boxed version of drop that works with Result/Validation monads
const drop = liftBinary(vanillaDrop)

export default drop
