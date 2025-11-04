import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "../types/index.ts"
import _validateAttributes from "../_validateAttributes/index.ts"
import _validateStringAttribute from "../_validateStringAttribute/index.ts"

export type Props = BaseProps

/*++
 + Html component - Root HTML element wrapper
 */
export default function _Html(props: Props): VirtualNode {
	const { children = [], xmlns, ...attrs } = props

	const attributes = {
		..._validateAttributes("html")(attrs),
		..._validateStringAttribute("xmlns")({ xmlns }),
	}

	return {
		_tag: "element" as const,
		tagName: "HTML",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
