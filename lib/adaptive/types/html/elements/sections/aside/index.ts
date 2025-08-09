import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface AsideElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: AsideRole
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "ASIDE"
}

export type AsideRole = Extract<
	AriaRole,
	"feed" | "none" | "note" | "presentation" | "region" | "search"
>
