import type { Integer, Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Demand from "../../Demand/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Offer from "../index.ts"
import type { OfferProps } from "../index.ts"

import DemandComponent from "../../../../../../src/define/Thing/Intangible/Demand/index.tsx"
import OfferComponent from "../../../../../../src/define/Thing/Intangible/Offer/index.tsx"

export type AggregateOfferType = "AggregateOffer"

export interface AggregateOfferProps {
	"@type"?: AggregateOfferType
	highPrice?: Number | Text
	lowPrice?: Number | Text
	offerCount?: Integer
	offers?:
		| Demand
		| Offer
		| ReturnType<typeof DemandComponent>
		| ReturnType<typeof OfferComponent>
}

type AggregateOffer = Thing & IntangibleProps & OfferProps & AggregateOfferProps

export default AggregateOffer
