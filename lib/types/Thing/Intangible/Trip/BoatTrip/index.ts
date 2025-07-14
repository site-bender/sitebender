import BoatTerminal from "../../../Place/CivicStructure/BoatTerminal/index.ts"
import Trip from "../index.ts"

export default interface BoatTrip extends Trip {
	/** The terminal or port from which the boat arrives. */
	arrivalBoatTerminal?: BoatTerminal
	/** The terminal or port from which the boat departs. */
	departureBoatTerminal?: BoatTerminal
}
