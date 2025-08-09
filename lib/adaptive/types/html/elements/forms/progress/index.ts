import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"

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
