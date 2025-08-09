import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

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
