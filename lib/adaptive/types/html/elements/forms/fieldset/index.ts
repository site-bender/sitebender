import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"
import type { LegendElement } from "./legend"

export interface FieldSetElement {
	attributes?: Override<
		Partial<HTMLFieldSetElement>,
		GlobalAttributeOverrides & {
			form?: string
			role?: Extract<AriaRole, "radiogroup" | "presentation" | "none">
		}
	>
	children?: Array<FlowContent> | [LegendElement, Array<FlowContent>]
	dataset?: Dataset
	readonly tagName: "FIELDSET"
}
