import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface AirportProps {
	/** IATA identifier for an airline or airport. */
	iataCode?: Text
	/** ICAO identifier for an airport. */
	icaoCode?: Text
}

type Airport =
	& Thing
	& CivicStructureProps
	& PlaceProps
	& AirportProps

export default Airport
