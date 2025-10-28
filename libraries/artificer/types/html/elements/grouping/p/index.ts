import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface ParagraphElement {
	attributes?: Override<
		Omit<Partial<HTMLParagraphElement>, "align">,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "P"
}
