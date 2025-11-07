import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface ProgressElement {
	attributes?: Override<
		Partial<HTMLProgressElement>,
		GlobalAttributeOverrides
	>
	children?: Array<ProgressContent>
	dataset?: Dataset
	readonly tagName: "PROGRESS"
}

export type ProgressContent = Exclude<
	PhrasingContent,
	{ tagName: "PROGRESS" }
>
