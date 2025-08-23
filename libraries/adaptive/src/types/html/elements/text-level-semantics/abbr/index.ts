import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface AbbreviationElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
			title: string
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "ABBR"
}
