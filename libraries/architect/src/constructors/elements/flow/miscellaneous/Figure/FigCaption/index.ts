import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../../guards/isFlowContent/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const FigCaption = GlobalOnly("FigCaption")(isFlowContent())

export default FigCaption
