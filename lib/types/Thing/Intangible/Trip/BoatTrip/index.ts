import type Thing from "../../../index.ts"
import type BoatTerminal from "../../../Place/CivicStructure/BoatTerminal/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"

import BoatTerminalComponent from "../../../../../components/Thing/Place/CivicStructure/BoatTerminal/index.ts"

export type BoatTripType = "BoatTrip"

export interface BoatTripProps {
	"@type"?: BoatTripType
	arrivalBoatTerminal?: BoatTerminal | ReturnType<typeof BoatTerminalComponent>
	departureBoatTerminal?:
		| BoatTerminal
		| ReturnType<typeof BoatTerminalComponent>
}

type BoatTrip = Thing & IntangibleProps & TripProps & BoatTripProps

export default BoatTrip
