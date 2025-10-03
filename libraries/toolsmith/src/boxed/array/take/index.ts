import vanillaTake from "../../../vanilla/array/take/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of take that works with Result/Validation monads
const take = liftBinary(vanillaTake)

export default take
