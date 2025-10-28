import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface BreakElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: Extract<AriaRole, "none" | "presentation">
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "BR"
}
