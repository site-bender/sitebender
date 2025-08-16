import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface LabelElement {
	attributes?: Override<
		Partial<HTMLLabelElement>,
		GlobalAttributeOverrides & {
			for?: string
			form?: string
		}
	>
	children?: Array<LabelContent>
	dataset?: Dataset
	readonly tagName: "LABEL"
}

export type LabelContent = Exclude<PhrasingContent, { tagName: "LABEL" }>
