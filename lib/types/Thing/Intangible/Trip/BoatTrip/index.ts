import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"
import type BoatTerminal from "../../../Place/CivicStructure/BoatTerminal/index.ts"

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
