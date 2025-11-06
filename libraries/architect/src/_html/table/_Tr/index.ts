import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML tr element wrapper for table row
 */
export default function _Tr(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("tr")(role)
	const attributes = {
		..._validateAttributes("tr")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TR",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
