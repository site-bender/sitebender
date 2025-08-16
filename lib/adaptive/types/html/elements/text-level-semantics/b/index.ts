import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface BringAttentionElement {
	attributes?: Override<Partial<HTMLElement>, GlobalAttributeOverrides>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "B"
}
