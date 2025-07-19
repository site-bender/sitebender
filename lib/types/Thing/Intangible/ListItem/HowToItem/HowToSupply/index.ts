import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type { ListItemProps } from "../../index.ts"
import type { HowToItemProps } from "../index.ts"

export interface HowToSupplyProps {
	/** The estimated cost of the supply or supplies consumed when performing instructions. */
	estimatedCost?: MonetaryAmount | Text
}

type HowToSupply =
	& Thing
	& HowToItemProps
	& IntangibleProps
	& ListItemProps
	& HowToSupplyProps

export default HowToSupply
