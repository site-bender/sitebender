import type { DateTime, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type Airport from "../../../Place/CivicStructure/Airport/index.ts"
import type Vehicle from "../../../Product/Vehicle/index.ts"
import type BoardingPolicyType from "../../Enumeration/BoardingPolicyType/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Distance from "../../Quantity/Distance/index.ts"
import type Duration from "../../Quantity/Duration/index.ts"
import type { TripProps } from "../index.ts"

import { BoardingPolicyType as BoardingPolicyTypeComponent } from "../../../../../../components/index.tsx"
import { Distance as DistanceComponent } from "../../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"
import { Airport as AirportComponent } from "../../../../../../components/index.tsx"
import { Vehicle as VehicleComponent } from "../../../../../../components/index.tsx"

export type FlightType = "Flight"

export interface FlightProps {
	"@type"?: FlightType
	aircraft?: Text | Vehicle | ReturnType<typeof VehicleComponent>
	arrivalAirport?: Airport | ReturnType<typeof AirportComponent>
	arrivalGate?: Text
	arrivalTerminal?: Text
	boardingPolicy?:
		| BoardingPolicyType
		| ReturnType<typeof BoardingPolicyTypeComponent>
	carrier?: Organization | ReturnType<typeof OrganizationComponent>
	departureAirport?: Airport | ReturnType<typeof AirportComponent>
	departureGate?: Text
	departureTerminal?: Text
	estimatedFlightDuration?:
		| Duration
		| Text
		| ReturnType<typeof DurationComponent>
	flightDistance?: Distance | Text | ReturnType<typeof DistanceComponent>
	flightNumber?: Text
	mealService?: Text
	seller?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	webCheckinTime?: DateTime
}

type Flight = Thing & IntangibleProps & TripProps & FlightProps

export default Flight
