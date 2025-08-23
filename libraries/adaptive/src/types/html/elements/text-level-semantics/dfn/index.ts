import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

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
