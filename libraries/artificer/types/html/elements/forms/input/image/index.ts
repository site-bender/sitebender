import type {
	AriaRole,
	Autocapitalize,
	Dataset,
	FormEnctype,
	FormMethod,
	FormTarget,
	GlobalAttributeOverrides,
	Override,
} from "../../../shared"

export interface ImageInputElement {
	attributes?: Override<
		Omit<
			Partial<HTMLInputElement>,
			| "accept"
			| "align"
			| "autocomplete"
			| "capture"
			| "checked"
			| "defaultChecked"
			| "defaultValue"
			| "dirName"
			| "files"
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
			| "step"
			| "useMap"
			| "valueAsDate"
			| "valueAsNumber"
		>,
		GlobalAttributeOverrides & {
			autocapitalize?: Autocapitalize
			form?: string
			formEnctype?: FormEnctype
			formMethod?: FormMethod
			formNoValidate?: boolean
			formTarget?: FormTarget
			role?: Extract<
				AriaRole,
				| "link"
				| "menuitem"
				| "menuitemcheckbox"
				| "menuitemradio"
				| "radio"
				| "switch"
			>
			type: "image"
			value?: never
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "INPUT"
}
