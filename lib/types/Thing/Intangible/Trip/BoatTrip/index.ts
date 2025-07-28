import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"
import type BoatTerminal from "../../../Place/CivicStructure/BoatTerminal/index.ts"

import BoatTripComponent from "../../../../../../components/Thing/Intangible/Trip/BoatTrip/index.tsx"

export interface BoatTripProps {
	arrivalBoatTerminal?: BoatTerminal
	departureBoatTerminal?: BoatTerminal
}

type BoatTrip =
	& Thing
	& IntangibleProps
	& TripProps
	& BoatTripProps

export default BoatTrip
