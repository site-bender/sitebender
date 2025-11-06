import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML noscript element wrapper for fallback content
 */
export default function _Noscript(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("noscript")(role)
	const attributes = {
		..._validateAttributes("noscript")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "NOSCRIPT",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
