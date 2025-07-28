import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type PriceSpecification from "../../Intangible/StructuredValue/PriceSpecification/index.ts"

import TradeActionComponent from "../../../../../components/Thing/Action/TradeAction/index.tsx"

export interface TradeActionProps {
	price?: Number | Text
	priceCurrency?: Text
	priceSpecification?: PriceSpecification
}

type TradeAction =
	& Thing
	& ActionProps
	& TradeActionProps

export default TradeAction
