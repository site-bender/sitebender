import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type PriceSpecification from "../../Intangible/StructuredValue/PriceSpecification/index.ts"
import type { ActionProps } from "../index.ts"
import type { BuyActionType } from "./BuyAction/index.ts"
import type { OrderActionType } from "./OrderAction/index.ts"
import type { PayActionType } from "./PayAction/index.ts"
import type { PreOrderActionType } from "./PreOrderAction/index.ts"
import type { QuoteActionType } from "./QuoteAction/index.ts"
import type { RentActionType } from "./RentAction/index.ts"
import type { SellActionType } from "./SellAction/index.ts"
import type { TipActionType } from "./TipAction/index.ts"

import { PriceSpecification as PriceSpecificationComponent } from "../../../../../components/index.tsx"

export type TradeActionType =
	| "TradeAction"
	| BuyActionType
	| SellActionType
	| RentActionType
	| PreOrderActionType
	| PayActionType
	| QuoteActionType
	| TipActionType
	| OrderActionType

export interface TradeActionProps {
	"@type"?: TradeActionType
	price?: Number | Text
	priceCurrency?: Text
	priceSpecification?:
		| PriceSpecification
		| ReturnType<typeof PriceSpecificationComponent>
}

type TradeAction = Thing & ActionProps & TradeActionProps

export default TradeAction
