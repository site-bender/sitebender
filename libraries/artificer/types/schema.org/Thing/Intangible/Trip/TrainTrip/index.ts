import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type TrainStation from "../../../Place/CivicStructure/TrainStation/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"

import TrainStationComponent from "../../../../../../../architect/src/define/Thing/Place/CivicStructure/TrainStation/index.tsx"

export type TrainTripType = "TrainTrip"

export interface TrainTripProps {
	"@type"?: TrainTripType
	arrivalPlatform?: Text
	arrivalStation?: TrainStation | ReturnType<typeof TrainStationComponent>
	departurePlatform?: Text
	departureStation?: TrainStation | ReturnType<typeof TrainStationComponent>
	trainName?: Text
	trainNumber?: Text
}

type TrainTrip = Thing & IntangibleProps & TripProps & TrainTripProps

export default TrainTrip
