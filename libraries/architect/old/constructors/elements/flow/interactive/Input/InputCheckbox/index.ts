import filterCheckedAttributes from "@sitebender/architect/constructors/elements/flow/interactive/Input/utilities/filterCheckedAttributes/index.ts"

import Input from "../index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const InputCheckbox = Input("checkbox")(filterCheckedAttributes)

export default InputCheckbox
