import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface CanvasElement {
	attributes?: Override<
		Partial<HTMLCanvasElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	// TODO: narrow children
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "CANVAS"
}
