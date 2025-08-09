import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface FigcaptionElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: Extract<AriaRole, "group" | "none" | "presentation">
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "FIGCAPTION"
}
