import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface BlockquoteElement {
	attributes?: Override<
		Partial<HTMLQuoteElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "BLOCKQUOTE"
}
