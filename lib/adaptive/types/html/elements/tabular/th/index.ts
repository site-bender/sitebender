import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface TableHeaderCellElement {
	attributes?: Override<
		Omit<
			Partial<HTMLTableCellElement>,
			| "align"
			| "axis"
			| "bgColor"
			| "ch"
			| "chOff"
			| "height"
			| "noWrap"
			| "vAlign"
			| "width"
		>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<TableHeaderCellContent>
	dataset?: Dataset
	readonly tagName: "TH"
}

export type TableHeaderCellContent = Exclude<
	FlowContent,
	| { tagName: "ARTICLE" }
	| { tagName: "ASIDE" }
	| { tagName: "FOOTER" }
	| { tagName: "H1" }
	| { tagName: "H2" }
	| { tagName: "H3" }
	| { tagName: "H4" }
	| { tagName: "H5" }
	| { tagName: "H6" }
	| { tagName: "HEADER" }
	| { tagName: "HN" }
	| { tagName: "NAV" }
	| { tagName: "SECTION" }
>
