import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type PriceSpecification from "../../Intangible/StructuredValue/PriceSpecification/index.ts"
import type { ActionProps } from "../index.ts"

import PriceSpecificationComponent from "../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"

export interface TradeActionProps {
	price?: Number | Text
	priceCurrency?: Text
	priceSpecification?:
		| PriceSpecification
		| ReturnType<typeof PriceSpecificationComponent>
}

type TradeAction = Thing & ActionProps & TradeActionProps

export default TradeAction
