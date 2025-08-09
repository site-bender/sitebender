import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"

export interface DataElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
			value: string
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "DATA"
}
