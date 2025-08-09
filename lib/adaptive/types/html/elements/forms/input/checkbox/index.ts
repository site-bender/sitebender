import type {
	AriaRole,
	Autocapitalize,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../../shared"

export interface CheckboxInputElement {
	attributes?: Override<
		Omit<
			Partial<HTMLInputElement>,
			| "accept"
			| "align"
			| "alt"
			| "autocomplete"
			| "capture"
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
			| "multiple"
			| "pattern"
			| "placeholder"
			| "readOnly"
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
			checked?: boolean
			form?: string
			role?: Extract<AriaRole, "menuitemcheckbox" | "option" | "switch">
			type: "checkbox"
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "INPUT"
}
