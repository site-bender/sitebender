import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"

export interface MeterElement {
	attributes?: Override<
		Partial<HTMLMeterElement>,
		GlobalAttributeOverrides & {
			form?: string
		}
	>
	children?: Array<MeterContent>
	dataset?: Dataset
	readonly tagName: "METER"
}

export type MeterContent = Exclude<PhrasingContent, { tagName: "METER" }>
