import GlobalOnly from "@sitebender/architect/constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "@sitebender/architect/guards/isPhrasingContent/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const U = GlobalOnly("u")(isPhrasingContent())

export default U
