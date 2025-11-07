import type {
	Autocapitalize,
	Autocomplete,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../../shared"

export interface HiddenInputElement {
	attributes?: Override<
		Omit<
			Partial<HTMLInputElement>,
			| "accept"
			| "align"
			| "alt"
			| "autocomplete"
			| "capture"
			| "checked"
			| "defaultChecked"
			| "defaultValue"
			| "files"
			| "formAction"
			| "formEnctype"
			| "formMethod"
			| "formNoValidate"
			| "formTarget"
			| "height"
			| "indeterminate"
			| "max"
			| "maxLength"
			| "min"
			| "minLength"
			| "multiple"
			| "pattern"
			| "placeholder"
			| "readOnly"
			| "required"
			| "selectDirection"
			| "selectionEnd"
			| "selectionStart"
			| "size"
			| "src"
			| "step"
			| "useMap"
			| "valueAsDate"
			| "valueAsNumber"
			| "width"
		>,
		& GlobalAttributeOverrides
		& {
			autocapitalize?: Autocapitalize
			autocomplete?: Autocomplete
			form?: string
			type: "hidden"
		}
		& (
			| {
				name: string
				value: string
			}
			| {
				name: "_charset_"
				value: never
			}
		)
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "INPUT"
}
