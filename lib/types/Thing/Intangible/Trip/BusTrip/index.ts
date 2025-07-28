import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type BusStation from "../../../Place/CivicStructure/BusStation/index.ts"
import type BusStop from "../../../Place/CivicStructure/BusStop/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"

import BusStationComponent from "../../../../../components/Thing/Place/CivicStructure/BusStation/index.ts"
import BusStopComponent from "../../../../../components/Thing/Place/CivicStructure/BusStop/index.ts"

export interface BusTripProps {
	arrivalBusStop?:
		| BusStation
		| BusStop
		| ReturnType<typeof BusStationComponent>
		| ReturnType<typeof BusStopComponent>
	busName?: Text
	busNumber?: Text
	departureBusStop?:
		| BusStation
		| BusStop
		| ReturnType<typeof BusStationComponent>
		| ReturnType<typeof BusStopComponent>
}

type BusTrip = Thing & IntangibleProps & TripProps & BusTripProps

export default BusTrip
