import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"
import type { Element } from "../../index.ts"

export interface TemplateElement {
	attributes?: Override<
		Partial<HTMLTemplateElement>,
		GlobalAttributeOverrides & {
			shadowRootMode?: "closed" | "open"
		}
	>
	children?: Array<Element>
	dataset?: Dataset
	readonly tagName: "TEMPLATE"
}
