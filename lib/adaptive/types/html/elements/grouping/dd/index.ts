import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface DescriptionDetailsElement {
	attributes?: Override<Partial<HTMLElement>, GlobalAttributeOverrides>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "DD"
}
