import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface SlotElement {
	attributes?: Override<Partial<HTMLSlotElement>, GlobalAttributeOverrides>
	children?: Array<FlowContent> // TODO(@chasm): transparent content
	dataset?: Dataset
	readonly tagName: "SLOT"
}
