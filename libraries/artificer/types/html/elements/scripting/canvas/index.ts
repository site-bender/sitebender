import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface CanvasElement {
	attributes?: Override<
		Partial<HTMLCanvasElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	// TODO(@chasm): narrow children
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "CANVAS"
}
