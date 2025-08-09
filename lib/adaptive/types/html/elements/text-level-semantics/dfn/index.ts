import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"

export interface DefinitionElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<Exclude<PhrasingContent, { tagName: "DFN" }>>
	dataset?: Dataset
	readonly tagName: "DFN"
}
