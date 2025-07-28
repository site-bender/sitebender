import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { TripProps } from "../../../../../types/Thing/Intangible/Trip/index.ts"
import type { FlightProps } from "../../../../../types/Thing/Intangible/Trip/Flight/index.ts"

import Trip from "../index.tsx"

export type Props = BaseComponentProps<
	FlightProps,
	"Flight",
	ExtractLevelProps<ThingProps, IntangibleProps, TripProps>
>

export default function Flight({
	aircraft,
	arrivalAirport,
	arrivalGate,
	arrivalTerminal,
	boardingPolicy,
	carrier,
	departureAirport,
	departureGate,
	departureTerminal,
	estimatedFlightDuration,
	flightDistance,
	flightNumber,
	mealService,
	seller,
	webCheckinTime,
	schemaType = "Flight",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Trip
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				aircraft,
				arrivalAirport,
				arrivalGate,
				arrivalTerminal,
				boardingPolicy,
				carrier,
				departureAirport,
				departureGate,
				departureTerminal,
				estimatedFlightDuration,
				flightDistance,
				flightNumber,
				mealService,
				seller,
				webCheckinTime,
				...subtypeProperties,
			}}
		/>
	)
}
