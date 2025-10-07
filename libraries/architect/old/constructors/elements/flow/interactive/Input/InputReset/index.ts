import Input from "../index.ts"
import filterAttributes from "../InputButton/filterAttributes/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const InputReset = Input("reset")(filterAttributes)

export default InputReset
