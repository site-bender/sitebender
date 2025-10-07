import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import GlobalOnly from "@sitebender/architect/constructors/abstracted/GlobalOnly/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const Rp = GlobalOnly("rp")(
	(child: ElementConfig) => child.tag?.toLowerCase() === "textnode",
)

export default Rp
