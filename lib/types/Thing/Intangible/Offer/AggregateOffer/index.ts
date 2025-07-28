import type { Integer, Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Demand from "../../Demand/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Offer from "../index.ts"
import type { OfferProps } from "../index.ts"

import DemandComponent from "../../../../../components/Thing/Intangible/Demand/index.ts"
import OfferComponent from "../../../../../components/Thing/Intangible/Offer/index.ts"

export interface AggregateOfferProps {
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
