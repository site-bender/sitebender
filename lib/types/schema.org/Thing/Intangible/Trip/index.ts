import type { DateTime, Time } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Place from "../../Place/index.ts"
import type Demand from "../Demand/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ItemList from "../ItemList/index.ts"
import type Offer from "../Offer/index.ts"
import type { BoatTripType } from "./BoatTrip/index.ts"
import type { BusTripType } from "./BusTrip/index.ts"
import type { FlightType } from "./Flight/index.ts"
import type { TouristTripType } from "./TouristTrip/index.ts"
import type { TrainTripType } from "./TrainTrip/index.ts"

import { Demand as DemandComponent } from "../../../../../components/index.tsx"
import { ItemList as ItemListComponent } from "../../../../../components/index.tsx"
import { Offer as OfferComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../components/index.tsx"
import { Trip as TripComponent } from "../../../../../components/index.tsx"

export type TripType =
	| "Trip"
	| BusTripType
	| FlightType
	| TouristTripType
	| BoatTripType
	| TrainTripType

export interface TripProps {
	"@type"?: TripType
	arrivalTime?: DateTime | Time
	departureTime?: DateTime | Time
	itinerary?:
		| ItemList
		| Place
		| ReturnType<typeof ItemListComponent>
		| ReturnType<typeof PlaceComponent>
	offers?:
		| Demand
		| Offer
		| ReturnType<typeof DemandComponent>
		| ReturnType<typeof OfferComponent>
	partOfTrip?: Trip | ReturnType<typeof TripComponent>
	provider?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	subTrip?: Trip | ReturnType<typeof TripComponent>
	tripOrigin?: Place | ReturnType<typeof PlaceComponent>
}

type Trip = Thing & IntangibleProps & TripProps

export default Trip
