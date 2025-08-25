import type { HeadingContent } from "../../categories/heading/index.ts"
import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface LegendElement {
	attributes?: Override<
		Omit<Partial<HTMLLegendElement>, "align">,
		GlobalAttributeOverrides
	>
	children?: Array<PhrasingContent | HeadingContent>
	dataset?: Dataset
	readonly tagName: "LEGEND"
}
