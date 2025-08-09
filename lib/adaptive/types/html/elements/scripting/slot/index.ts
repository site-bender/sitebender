import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface SlotElement {
	attributes?: Override<Partial<HTMLSlotElement>, GlobalAttributeOverrides>
	children?: Array<FlowContent> // TODO: transparent content
	dataset?: Dataset
	readonly tagName: "SLOT"
}
