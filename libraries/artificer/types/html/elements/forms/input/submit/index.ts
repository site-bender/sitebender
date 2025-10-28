import type {
	Autocapitalize,
	Dataset,
	FormEnctype,
	FormMethod,
	FormTarget,
	GlobalAttributeOverrides,
	Override,
} from "../../../shared"

export interface SubmitInputElement {
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
		GlobalAttributeOverrides & {
			autocapitalize?: Autocapitalize
			form?: string
			formEnctype?: FormEnctype
			formMethod?: FormMethod
			formNoValidate?: boolean
			formTarget?: FormTarget
			type: "submit"
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "INPUT"
}
