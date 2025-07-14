import { Text } from "../../../../DataType/index.ts"
import BusStation from "../../../Place/CivicStructure/BusStation/index.ts"
import BusStop from "../../../Place/CivicStructure/BusStop/index.ts"
import Trip from "../index.ts"

export default interface BusTrip extends Trip {
	/** The stop or station from which the bus arrives. */
	arrivalBusStop?: BusStop | BusStation
	/** The name of the bus (e.g. Bolt Express). */
	busName?: Text
	/** The unique identifier for the bus. */
	busNumber?: Text
	/** The stop or station from which the bus departs. */
	departureBusStop?: BusStop | BusStation
}
