import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import GlobalOnly from "@sitebender/architect/constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "@sitebender/architect/guards/isPhrasingContent/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const rubyContentFilter = (child: ElementConfig): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// Allow ruby-specific elements
	if (child.tag === "Rt" || child.tag === "Rp") {
		return true
	}

	// For other element configs, check if they're valid phrasing content
	return isPhrasingContent()(child)
}

const Ruby = GlobalOnly("ruby")(rubyContentFilter)

export default Ruby
