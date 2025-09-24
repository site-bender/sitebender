import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface PreformattedTextElement {
	attributes?: Override<
		Omit<Partial<HTMLPreElement>, "width">,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "PRE"
}
