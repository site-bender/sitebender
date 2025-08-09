import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { OptionElement } from "./option"

export interface OptionGroupElement {
	attributes?: Override<
		Partial<HTMLOptGroupElement>,
		GlobalAttributeOverrides
	>
	children?: Array<OptionElement>
	dataset?: Dataset
	readonly tagName: "OPTGROUP"
}
