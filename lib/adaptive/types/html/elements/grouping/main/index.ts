import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface MainElement {
	attributes?: Override<Partial<HTMLElement>, GlobalAttributeOverrides>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "MAIN"
}
