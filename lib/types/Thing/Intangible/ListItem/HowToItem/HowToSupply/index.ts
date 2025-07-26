import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ListItemProps } from "../../index.ts"
import type { HowToItemProps } from "../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"

export interface HowToSupplyProps {
	estimatedCost?: MonetaryAmount | Text
}

type HowToSupply =
	& Thing
	& IntangibleProps
	& ListItemProps
	& HowToItemProps
	& HowToSupplyProps

export default HowToSupply
