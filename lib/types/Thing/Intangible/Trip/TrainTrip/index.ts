import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type TrainStation from "../../../Place/CivicStructure/TrainStation/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"

export interface TrainTripProps {
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

type TrainTrip =
	& Thing
	& IntangibleProps
	& TripProps
	& TrainTripProps

export default TrainTrip
