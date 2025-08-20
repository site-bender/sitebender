import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface FooterElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: FooterRole
		}
	>
	children?: Array<
		Exclude<FlowContent, { tagName: "FOOTER" } | { tagName: "HEADER" }>
	>
	dataset?: Dataset
	readonly tagName: "FOOTER"
}

export type FooterRole = Extract<
	AriaRole,
	"contentinfo" | "group" | "none" | "presentation"
>
