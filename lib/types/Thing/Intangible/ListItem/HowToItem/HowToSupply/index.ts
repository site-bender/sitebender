import type { Text } from "../../../../../DataType/index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type HowToItem from "../index.ts"

export default interface HowToSupply extends HowToItem {
	/** The estimated cost of the supply or supplies consumed when performing instructions. */
	estimatedCost?: MonetaryAmount | Text
}
