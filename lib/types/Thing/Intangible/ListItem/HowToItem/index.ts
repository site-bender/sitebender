import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { ListItemProps } from "../index.ts"

export interface HowToItemProps {
	/** The required quantity of the item(s). */
	requiredQuantity?: Number | QuantitativeValue | Text
}

type HowToItem =
	& Thing
	& IntangibleProps
	& ListItemProps
	& HowToItemProps

export default HowToItem
