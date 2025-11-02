import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type { ListItemProps } from "../../index.ts"
import type { HowToItemProps } from "../index.ts"

import MonetaryAmountComponent from "../../../../../../../src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"

export type HowToSupplyType = "HowToSupply"

export interface HowToSupplyProps {
	"@type"?: HowToSupplyType
	estimatedCost?:
		| MonetaryAmount
		| Text
		| ReturnType<typeof MonetaryAmountComponent>
}

type HowToSupply =
	& Thing
	& IntangibleProps
	& ListItemProps
	& HowToItemProps
	& HowToSupplyProps

export default HowToSupply
