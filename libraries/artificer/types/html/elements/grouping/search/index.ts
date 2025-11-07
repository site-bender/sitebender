import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface SearchElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: Extract<
				AriaRole,
				"form" | "group" | "none" | "presentation" | "region" | "search"
			>
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "SEARCH"
}
