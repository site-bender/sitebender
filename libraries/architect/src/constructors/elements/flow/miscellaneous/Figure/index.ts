import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const Figure = GlobalOnly("Figure")(isFlowContent())

export default Figure
