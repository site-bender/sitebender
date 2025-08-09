import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"

export interface OutputElement {
	attributes?: Override<
		Partial<HTMLOutputElement>,
		GlobalAttributeOverrides & {
			for?: string
			form?: string
			role?: AriaRole
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "OUTPUT"
}
