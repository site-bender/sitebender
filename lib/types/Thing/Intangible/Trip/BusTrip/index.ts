import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"
import type BusStation from "../../../Place/CivicStructure/BusStation/index.ts"
import type BusStop from "../../../Place/CivicStructure/BusStop/index.ts"

import BusTripComponent from "../../../../../../components/Thing/Intangible/Trip/BusTrip/index.tsx"

export interface BusTripProps {
	arrivalBusStop?: BusStation | BusStop
	busName?: Text
	busNumber?: Text
	departureBusStop?: BusStation | BusStop
}

type BusTrip =
	& Thing
	& IntangibleProps
	& TripProps
	& BusTripProps

export default BusTrip
