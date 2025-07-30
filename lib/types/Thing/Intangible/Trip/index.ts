import type { DateTime, Time } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Place from "../../Place/index.ts"
import type Demand from "../Demand/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ItemList from "../ItemList/index.ts"
import type Offer from "../Offer/index.ts"

import DemandComponent from "../../../../components/Thing/Intangible/Demand/index.ts"
import ItemListComponent from "../../../../components/Thing/Intangible/ItemList/index.ts"
import OfferComponent from "../../../../components/Thing/Intangible/Offer/index.ts"
import TripComponent from "../../../../components/Thing/Intangible/Trip/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"
import PlaceComponent from "../../../../components/Thing/Place/index.ts"

export interface TripProps {
	"@type"?: "Trip"
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
