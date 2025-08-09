import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"

export interface SourceElement {
	attributes?: Override<Partial<HTMLSourceElement>, GlobalAttributeOverrides>
	children?: never
	dataset?: Dataset
	readonly tagName: "SOURCE"
}
