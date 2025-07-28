import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"
import type TrainStation from "../../../Place/CivicStructure/TrainStation/index.ts"

import TrainTripComponent from "../../../../../../components/Thing/Intangible/Trip/TrainTrip/index.tsx"

export interface TrainTripProps {
	arrivalPlatform?: Text
	arrivalStation?: TrainStation
	departurePlatform?: Text
	departureStation?: TrainStation
	trainName?: Text
	trainNumber?: Text
}

type TrainTrip =
	& Thing
	& IntangibleProps
	& TripProps
	& TrainTripProps

export default TrainTrip
