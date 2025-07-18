import type { Text } from "../../../../DataType/index.ts"
import type CivicStructure from "../index.ts"

export default interface Airport extends CivicStructure {
	/** IATA identifier for an airline or airport. */
	iataCode?: Text
	/** ICAO identifier for an airport. */
	icaoCode?: Text
}
