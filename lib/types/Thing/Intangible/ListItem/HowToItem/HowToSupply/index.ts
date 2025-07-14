import { Text } from "../../../../../DataType/index.ts"
import MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import HowToItem from "../index.ts"

export default interface HowToSupply extends HowToItem {
	/** The estimated cost of the supply or supplies consumed when performing instructions. */
	estimatedCost?: MonetaryAmount | Text
}
