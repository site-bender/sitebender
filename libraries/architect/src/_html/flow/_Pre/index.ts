import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML pre element wrapper for preformatted text
 */
export default function _Pre(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("pre")(role)
	const attributes = {
		..._validateAttributes("pre")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "PRE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
