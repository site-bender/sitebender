import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		autocomplete?: string
		cols?: number // Visible width in characters
		dirname?: string
		disabled?: boolean
		form?: string // Associated form ID
		maxlength?: number
		minlength?: number
		name?: string
		placeholder?: string
		readonly?: boolean
		required?: boolean
		rows?: number // Visible height in lines
		wrap?: "hard" | "soft"
	}>

/*++
 + HTML textarea element wrapper for multiline text input
 */
export default function _Textarea(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("textarea")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("textarea")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("textarea")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TEXTAREA",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
