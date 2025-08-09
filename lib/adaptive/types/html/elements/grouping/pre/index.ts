import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"

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
