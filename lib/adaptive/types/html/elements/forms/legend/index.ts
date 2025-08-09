import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { HeadingContent } from "../categories/heading"
import type { PhrasingContent } from "../categories/phrasing"

export interface LegendElement {
	attributes?: Override<
		Omit<Partial<HTMLLegendElement>, "align">,
		GlobalAttributeOverrides
	>
	children?: Array<PhrasingContent | HeadingContent>
	dataset?: Dataset
	readonly tagName: "LEGEND"
}
