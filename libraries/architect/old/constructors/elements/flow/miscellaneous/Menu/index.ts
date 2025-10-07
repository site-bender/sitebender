import type { ElementConfig } from "../../../types/index.ts"

import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isValidMenuChild = (child: ElementConfig): boolean => {
	if (!child || typeof child !== "object" || !child.tag) {
		return false
	}
	return ["Li", "Script", "Template"].includes(child.tag)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const Menu = GlobalOnly("Menu")(isValidMenuChild)

export default Menu
