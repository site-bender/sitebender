import type { ElementConfig } from "../../../../../../types/index.ts"

import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const tableRowFilter = (child: ElementConfig): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		const tag = (child as { tag?: string }).tag?.toLowerCase()
		return tag === "tr" || tag === "script" || tag === "template"
	}
	return false
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const THead = GlobalOnly("THead")(tableRowFilter)

export default THead
