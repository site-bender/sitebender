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
 + HTML em element wrapper for stress emphasis
 */
export default function _Em(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("em")(role)
	const attributes = {
		..._validateAttributes("em")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "EM",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
