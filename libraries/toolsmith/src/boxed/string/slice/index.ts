import liftTernary from "../../lift/liftTernary/index.ts"
import vanillaSlice from "../../../vanilla/string/slice/index.ts"

//++ Boxed version of slice that works with Result/Validation monads
const slice = liftTernary(vanillaSlice)

export default slice
