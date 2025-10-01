import type { ElementConfig } from "../../../../../../types/index.ts"

import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../../guards/isFlowContent/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const flowContentFilter = (child: ElementConfig): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// For element configs, check if they're valid flow content
	return isFlowContent()(child)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const Dd = GlobalOnly("Dd")(flowContentFilter)

export default Dd
