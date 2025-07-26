import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface AirportProps {
	iataCode?: Text
	icaoCode?: Text
}

type Airport =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& AirportProps

export default Airport
