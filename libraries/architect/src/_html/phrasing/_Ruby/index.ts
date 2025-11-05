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
 + HTML ruby element wrapper for ruby annotations
 */
export default function _Ruby(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("ruby")(role)
	const attributes = {
		..._validateAttributes("ruby")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "RUBY",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
