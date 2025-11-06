import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		autocomplete?: string
		disabled?: boolean
		form?: string // Associated form ID
		multiple?: boolean
		name?: string
		required?: boolean
		size?: number // Number of visible options
	}>

/*++
 + HTML select element wrapper for dropdown/listbox control
 + Note: Multiple-specific role validation deferred (requires conditional logic)
 + Uses generic role validation for now
 */
export default function _Select(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("select")(role)
	const attributes = {
		..._validateAttributes("select")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "SELECT",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
