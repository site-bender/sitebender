import filterTextAttributes from "@sitebender/architect/constructors/elements/flow/interactive/Input/utilities/filterTextAttributes/index.ts"

import Input from "../index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const InputTel = Input("tel")(filterTextAttributes)

export default InputTel
