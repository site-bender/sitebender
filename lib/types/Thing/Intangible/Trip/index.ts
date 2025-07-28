import type { DateTime, Time } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Demand from "../Demand/index.ts"
import type ItemList from "../ItemList/index.ts"
import type Offer from "../Offer/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Place from "../../Place/index.ts"

import TripComponent from "../../../../../components/Thing/Intangible/Trip/index.tsx"

export interface TripProps {
	arrivalTime?: DateTime | Time
	departureTime?: DateTime | Time
	itinerary?: ItemList | Place
	offers?: Demand | Offer
	partOfTrip?: Trip
	provider?: Organization | Person
	subTrip?: Trip
	tripOrigin?: Place
}

type Trip =
	& Thing
	& IntangibleProps
	& TripProps

export default Trip
