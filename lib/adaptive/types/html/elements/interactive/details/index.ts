import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"
import type { SummaryElement } from "../summary/index.ts"

export interface DetailsElement {
	attributes?: Override<Partial<HTMLDetailsElement>, GlobalAttributeOverrides>
	children?: [SummaryElement, ...Array<FlowContent>]
	dataset?: Dataset
	readonly tagName: "DETAILS"
}
