import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface MapElement {
	attributes?: Override<Partial<HTMLMapElement>, GlobalAttributeOverrides>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "MAP"
}
