import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface HorizontalRuleElement {
	attributes?: Override<
		Omit<
			Partial<HTMLHRElement>,
			"align" | "color" | "noShade" | "size" | "width"
		>,
		GlobalAttributeOverrides & {
			role?: Extract<AriaRole, "none" | "presentation">
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "HR"
}
