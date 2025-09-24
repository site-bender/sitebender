import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { RubyFallbackParenthesisElement } from "../rp/index.ts"
import type { RubyTextElement } from "../rt/index.ts"

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
