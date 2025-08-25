import type {
	Autocapitalize,
	Autocomplete,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../../shared"

export interface FileInputElement {
	attributes?: Override<
		Omit<
			Partial<HTMLInputElement>,
			| "align"
			| "alt"
			| "autocomplete"
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
			| "max"
			| "maxLength"
			| "min"
			| "minLength"
			| "pattern"
			| "placeholder"
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
		GlobalAttributeOverrides & {
			autocapitalize?: Autocapitalize
			autocomplete?: Autocomplete
			form?: string
			list?: string
			type: "file"
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "INPUT"
}
