import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"

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
