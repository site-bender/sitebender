import type Thing from "../../../index.ts"
import type BoatTerminal from "../../../Place/CivicStructure/BoatTerminal/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"

export interface BoatTripProps {
	/** The terminal or port from which the boat arrives. */
	arrivalBoatTerminal?: BoatTerminal
	/** The terminal or port from which the boat departs. */
	departureBoatTerminal?: BoatTerminal
}

type BoatTrip =
	& Thing
	& IntangibleProps
	& TripProps
	& BoatTripProps

export default BoatTrip
