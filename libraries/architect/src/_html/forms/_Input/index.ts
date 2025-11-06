import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		type?:
			| "button"
			| "checkbox"
			| "color"
			| "date"
			| "datetime-local"
			| "email"
			| "file"
			| "hidden"
			| "image"
			| "month"
			| "number"
			| "password"
			| "radio"
			| "range"
			| "reset"
			| "search"
			| "submit"
			| "tel"
			| "text"
			| "time"
			| "url"
			| "week"
		accept?: string // File types (for type="file")
		alt?: string // Alternative text (for type="image")
		autocomplete?: string
		checked?: boolean // For checkbox/radio
		dirname?: string
		disabled?: boolean
		form?: string // Associated form ID
		formaction?: string // For submit/image
		formenctype?: string
		formmethod?: string
		formnovalidate?: boolean
		formtarget?: string
		height?: number // For type="image"
		list?: string // Datalist ID
		max?: number | string // For number/date types
		maxlength?: number
		min?: number | string // For number/date types
		minlength?: number
		multiple?: boolean // For email/file
		name?: string
		pattern?: string // Regex pattern
		placeholder?: string
		readonly?: boolean
		required?: boolean
		size?: number
		src?: string // For type="image"
		step?: number | string // For number/date types
		value?: string | number
		width?: number // For type="image"
	}>

/*++
 + HTML input element wrapper for form input control
 + Note: Type-specific role validation deferred (requires conditional logic)
 + Uses generic role validation for now
 */
export default function _Input(props: Props): VirtualNode {
	const { role, ...attrs } = props
	const roleAttrs = _validateRole("input")(role)
	const attributes = {
		..._validateAttributes("input")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "INPUT",
		attributes,
		children: [],
	}
}
