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
 + HTML u element wrapper for unarticulated annotation
 */
export default function _U(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("u")(role)
	const attributes = {
		..._validateAttributes("u")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "U",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
