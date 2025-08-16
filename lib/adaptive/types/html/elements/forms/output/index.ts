import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

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
