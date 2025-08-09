import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface MapElement {
	attributes?: Override<Partial<HTMLMapElement>, GlobalAttributeOverrides>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "MAP"
}
