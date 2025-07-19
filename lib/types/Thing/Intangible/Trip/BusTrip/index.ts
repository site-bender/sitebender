import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type BusStation from "../../../Place/CivicStructure/BusStation/index.ts"
import type BusStop from "../../../Place/CivicStructure/BusStop/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"

export interface BusTripProps {
	/** The stop or station from which the bus arrives. */
	arrivalBusStop?: BusStop | BusStation
	/** The name of the bus (e.g. Bolt Express). */
	busName?: Text
	/** The unique identifier for the bus. */
	busNumber?: Text
	/** The stop or station from which the bus departs. */
	departureBusStop?: BusStop | BusStation
}

type BusTrip =
	& Thing
	& IntangibleProps
	& TripProps
	& BusTripProps

export default BusTrip
