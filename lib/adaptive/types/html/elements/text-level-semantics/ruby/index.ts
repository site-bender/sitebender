import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"
import type { RubyFallbackParenthesisElement } from "./rp"
import type { RubyTextElement } from "./rt"

export interface RubyElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<
		PhrasingContent | RubyFallbackParenthesisElement | RubyTextElement
	>
	dataset?: Dataset
	readonly tagName: "RUBY"
}
