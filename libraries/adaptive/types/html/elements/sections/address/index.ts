import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface AddressElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<AddressContent>
	dataset?: Dataset
	readonly tagName: "ADDRESS"
}

export type AddressContent = Exclude<
	FlowContent,
	| { tagName: "ADDRESS" }
	| { tagName: "HGROUP" }
	| { tagName: "H1" }
	| { tagName: "H2" }
	| { tagName: "H3" }
	| { tagName: "H4" }
	| { tagName: "H5" }
	| { tagName: "h6" }
	| { tagName: "HN" }
	| { tagName: "ARTICLE" }
	| { tagName: "ASIDE" }
	| { tagName: "SECTION" }
	| { tagName: "NAV" }
	| { tagName: "HEADER" }
	| { tagName: "FOOTER" }
>
