import type { Element } from ".."

import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"

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
