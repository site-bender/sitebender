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
 + HTML sub element wrapper for subscript
 */
export default function _Sub(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("sub")(role)
	const attributes = {
		..._validateAttributes("sub")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SUB",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
