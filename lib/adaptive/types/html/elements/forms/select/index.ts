import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { HorizontalRuleElement } from "../grouping/hr"
import type { OptionGroupElement } from "./optgroup"
import type { OptionElement } from "./option"

export interface SelectElementMultiple {
	attributes?: Override<
		Partial<HTMLSelectElement>,
		GlobalAttributeOverrides & {
			autocomplete?: string // TODO: narrow this
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
			autocomplete?: string // TODO: narrow this
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
