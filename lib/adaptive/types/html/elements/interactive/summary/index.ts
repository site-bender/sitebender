import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { HeadingContent } from "../categories/heading"
import type { PhrasingContent } from "../categories/phrasing"

export interface SummaryElement {
	attributes?: Override<Partial<HTMLElement>, GlobalAttributeOverrides>
	children?: Array<PhrasingContent> | [HeadingContent]
	dataset?: Dataset
	readonly tagName: "SUMMARY"
}
