import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// No element-specific props
	}>

/*++
 + HTML cite element wrapper for citations/references
 */
export default function _Cite(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("cite")(role)
	const attributes = {
		..._validateAttributes("cite")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "CITE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
