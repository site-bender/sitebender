import { Text } from "../../../../DataType/index.ts"
import TrainStation from "../../../Place/CivicStructure/TrainStation/index.ts"
import Trip from "../index.ts"

export default interface TrainTrip extends Trip {
	/** The platform where the train arrives. */
	arrivalPlatform?: Text
	/** The station where the train trip ends. */
	arrivalStation?: TrainStation
	/** The platform from which the train departs. */
	departurePlatform?: Text
	/** The station from which the train departs. */
	departureStation?: TrainStation
	/** The name of the train (e.g. The Orient Express). */
	trainName?: Text
	/** The unique identifier for the train. */
	trainNumber?: Text
}
