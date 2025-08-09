import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { FlowContent } from "../categories/flow"
import type { SummaryElement } from "./summary"

export interface DetailsElement {
	attributes?: Override<Partial<HTMLDetailsElement>, GlobalAttributeOverrides>
	children?: [SummaryElement, ...Array<FlowContent>]
	dataset?: Dataset
	readonly tagName: "DETAILS"
}
