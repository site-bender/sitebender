import type { HeadingContent } from "../../categories/heading/index.ts"
import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface SummaryElement {
	attributes?: Override<Partial<HTMLElement>, GlobalAttributeOverrides>
	children?: Array<PhrasingContent> | [HeadingContent]
	dataset?: Dataset
	readonly tagName: "SUMMARY"
}
