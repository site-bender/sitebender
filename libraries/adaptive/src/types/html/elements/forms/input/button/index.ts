import type {
	AriaRole,
	Autocapitalize,
	Dataset,
	FormPopoverTarget,
	GlobalAttributeOverrides,
	Override,
} from "../../../shared"

export interface ButtonInputElement {
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
			popoverTarget?: FormPopoverTarget
			popoverTargetAction?: string
			role?: Extract<
				AriaRole,
				| "checkbox"
				| "combobox"
				| "link"
				| "menuitem"
				| "menuitemcheckbox"
				| "menuitemradio"
				| "option"
				| "radio"
				| "switch"
				| "tab"
			>
			type: "button"
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "INPUT"
}
