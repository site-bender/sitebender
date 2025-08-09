import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface HeaderElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: HeaderRole
		}
	>
	children?: Array<
		Exclude<FlowContent, { tagName: "FOOTER" } | { tagName: "HEADER" }>
	>
	dataset?: Dataset
	readonly tagName: "HEADER"
}

export type HeaderRole = Extract<
	AriaRole,
	"banner" | "group" | "none" | "presentation"
>
