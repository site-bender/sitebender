import type { HorizontalRuleElement } from "../../grouping/hr/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { OptionGroupElement } from "../optgroup/index.ts"
import type { OptionElement } from "../option/index.ts"

export interface SelectElementMultiple {
	attributes?: Override<
		Partial<HTMLSelectElement>,
		GlobalAttributeOverrides & {
			autocomplete?: string // TODO(@chasm): narrow this
			autofocus?: boolean
			form?: string
			multiple: true
		}
	>
	children?: Array<
		OptionElement | OptionGroupElement | HorizontalRuleElement
	>
	dataset?: Dataset
	readonly tagName: "SELECT"
}

export interface SelectElementSingle {
	attributes?: Override<
		Partial<HTMLSelectElement>,
		GlobalAttributeOverrides & {
			autocomplete?: string // TODO(@chasm): narrow this
			autofocus?: boolean
			form?: string
			multiple?: never
			role?: Extract<AriaRole, "menu">
			size?: 1
		}
	>
	children?: Array<
		OptionElement | OptionGroupElement | HorizontalRuleElement
	>
	dataset?: Dataset
	readonly tagName: "SELECT"
}

export type SelectElement = SelectElementMultiple | SelectElementSingle
