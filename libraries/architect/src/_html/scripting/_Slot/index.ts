import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		name?: string // Slot name
	}>

/*++
 + HTML slot element wrapper for shadow DOM slots
 */
export default function _Slot(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("slot")(role)
	const attributes = {
		..._validateAttributes("slot")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SLOT",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
