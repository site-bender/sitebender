import filterDateTimeAttributes from "@sitebender/architect/constructors/elements/flow/interactive/Input/utilities/filterDateTimeAttributes/index.ts"

import Input from "../index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const InputDateTimeLocal = Input("datetime-local")(filterDateTimeAttributes)

export default InputDateTimeLocal
