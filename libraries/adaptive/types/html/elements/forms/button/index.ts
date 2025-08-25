import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	AriaRole,
	Dataset,
	FormEnctype,
	FormMethod,
	FormPopoverTarget,
	FormTarget,
	FormType,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface ButtonElement {
	attributes?: Override<
		Partial<HTMLButtonElement>,
		GlobalAttributeOverrides & {
			autofocus?: boolean
			form?: string
			formEnctype?: FormEnctype
			formMethod?: FormMethod
			formTarget?: FormTarget
			popoverTarget?: string
			popoverTargetAction?: FormPopoverTarget
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
			type?: FormType
		}
	>
	children?: Array<ButtonContent>
	dataset?: Dataset
	readonly tagName: "BUTTON"
}

export type ButtonContent = Exclude<PhrasingContent, { tagName: "" }>
