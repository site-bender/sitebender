import type { DateTime, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"
import type Airport from "../../../Place/CivicStructure/Airport/index.ts"
import type BoardingPolicyType from "../../Enumeration/BoardingPolicyType/index.ts"
import type Distance from "../../Quantity/Distance/index.ts"
import type Duration from "../../Quantity/Duration/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type Vehicle from "../../../Product/Vehicle/index.ts"

import FlightComponent from "../../../../../../components/Thing/Intangible/Trip/Flight/index.tsx"

export interface FlightProps {
	aircraft?: Text | Vehicle
	arrivalAirport?: Airport
	arrivalGate?: Text
	arrivalTerminal?: Text
	boardingPolicy?: BoardingPolicyType
	carrier?: Organization
	departureAirport?: Airport
	departureGate?: Text
	departureTerminal?: Text
	estimatedFlightDuration?: Duration | Text
	flightDistance?: Distance | Text
	flightNumber?: Text
	mealService?: Text
	seller?: Organization | Person
	webCheckinTime?: DateTime
}

type Flight =
	& Thing
	& IntangibleProps
	& TripProps
	& FlightProps

export default Flight
