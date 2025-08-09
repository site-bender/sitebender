import type {
	AriaRole,
	Autocapitalize,
	Autocomplete,
	Dataset,
	GlobalAttributeOverrides,
	Override,
	Spellcheck,
} from "../../../shared"

export interface TextInputElement {
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
		& GlobalAttributeOverrides
		& {
			autocapitalize?: Autocapitalize
			autocomplete?: Autocomplete
			form?: string
			spellcheck?: Spellcheck
			type: "text"
		}
		& (
			| {
				list?: never
				role?: Extract<AriaRole, "combobox" | "searchbox" | "spinbutton">
			}
			| {
				list?: string
			}
		)
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "INPUT"
}
