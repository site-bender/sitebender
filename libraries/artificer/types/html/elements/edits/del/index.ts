import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface DeletionElement {
	attributes?: Override<
		Partial<HTMLModElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "DEL"
}
