import type {
	Autocapitalize,
	Autocomplete,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../../shared"

export interface TimeInputElement {
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
			| "dirName"
			| "files"
			| "formAction"
			| "formEnctype"
			| "formMethod"
			| "formNoValidate"
			| "formTarget"
			| "height"
			| "indeterminate"
			| "maxLength"
			| "minLength"
			| "multiple"
			| "pattern"
			| "placeholder"
			| "selectDirection"
			| "selectionEnd"
			| "selectionStart"
			| "size"
			| "src"
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
			type: "time"
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "INPUT"
}
