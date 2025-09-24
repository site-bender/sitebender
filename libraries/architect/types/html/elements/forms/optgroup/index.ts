import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"
import type { OptionElement } from "../option/index.ts"

export interface OptionGroupElement {
	attributes?: Override<
		Partial<HTMLOptGroupElement>,
		GlobalAttributeOverrides
	>
	children?: Array<OptionElement>
	dataset?: Dataset
	readonly tagName: "OPTGROUP"
}
