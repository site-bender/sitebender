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
 + HTML small element wrapper for side comments/small print
 */
export default function _Small(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("small")(role)
	const attributes = {
		..._validateAttributes("small")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SMALL",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
