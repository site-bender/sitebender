import vanillaLookup from "../../../vanilla/object/lookup/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of lookup that works with Result/Validation monads
const lookup = liftBinary(vanillaLookup)

export default lookup
