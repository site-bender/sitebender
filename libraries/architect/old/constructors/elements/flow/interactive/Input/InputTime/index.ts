import filterDateTimeAttributes from "@sitebender/architect/constructors/elements/flow/interactive/Input/utilities/filterDateTimeAttributes/index.ts"

import Input from "../index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const InputTime = Input("time")(filterDateTimeAttributes)

export default InputTime
