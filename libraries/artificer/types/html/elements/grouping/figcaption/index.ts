import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

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
