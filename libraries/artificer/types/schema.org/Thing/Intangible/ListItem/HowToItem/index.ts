import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { ListItemProps } from "../index.ts"
import type { HowToSupplyType } from "./HowToSupply/index.ts"
import type { HowToToolType } from "./HowToTool/index.ts"

import QuantitativeValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type HowToItemType = "HowToItem" | HowToSupplyType | HowToToolType

export interface HowToItemProps {
	"@type"?: HowToItemType
	requiredQuantity?:
		| Number
		| QuantitativeValue
		| Text
		| ReturnType<typeof QuantitativeValueComponent>
}

type HowToItem = Thing & IntangibleProps & ListItemProps & HowToItemProps

export default HowToItem
