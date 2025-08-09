import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { TextNode } from "../text-node"

export interface RubyFallbackParenthesisElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<TextNode>
	dataset?: Dataset
	readonly tagName: "RP"
}
