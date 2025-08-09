import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface SectionElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: SectionRole
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "SECTION"
}

export type SectionRole = Extract<
	AriaRole,
	| "alert"
	| "alertdialog"
	| "application"
	| "banner"
	| "complementary"
	| "contentinfo"
	| "dialog"
	| "document"
	| "feed"
	| "log"
	| "main"
	| "marquee"
	| "navigation"
	| "none"
	| "note"
	| "presentation"
	| "region"
	| "search"
	| "status"
	| "tabpanel"
>
