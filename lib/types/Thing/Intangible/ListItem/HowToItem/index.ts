import type { Number, Text } from "../../../../DataType/index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type ListItem from "../index.ts"

export default interface HowToItem extends ListItem {
	/** The required quantity of the item(s). */
	requiredQuantity?: Number | QuantitativeValue | Text
}
