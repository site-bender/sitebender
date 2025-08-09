import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface DescriptionTermElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: Extract<AriaRole, "listitem">
		}
	>
	children?: Array<
		Exclude<
			FlowContent,
			| { tagName: "FOOTER" }
			| { tagName: "HEADER" }
			| { tagName: "ARTICLE" }
			| { tagName: "ASIDE" }
			| { tagName: "NAV" }
			| { tagName: "SECTION" }
			| { tagName: "H1" }
			| { tagName: "H2" }
			| { tagName: "H3" }
			| { tagName: "H4" }
			| { tagName: "H5" }
			| { tagName: "H6" }
			| { tagName: "HN" }
		>
	>
	dataset?: Dataset
	readonly tagName: "DT"
}
