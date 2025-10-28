import type {
	Autocapitalize,
	Autocomplete,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../../shared"

export interface TelephoneInputElement {
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
			| "min"
			| "multiple"
			| "selectDirection"
			| "selectionEnd"
			| "selectionStart"
			| "src"
			| "step"
			| "useMap"
			| "valueAsDate"
			| "valueAsNumber"
			| "width"
		>,
		GlobalAttributeOverrides & {
			autocapitalize?: Autocapitalize
			autocomplete?: Autocomplete
			form?: string
			list?: string
			type: "tel"
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "INPUT"
}
