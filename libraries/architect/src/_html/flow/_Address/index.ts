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
 + HTML address element wrapper for contact information
 */
export default function _Address(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("address")(role)
	const attributes = {
		..._validateAttributes("address")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "ADDRESS",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
