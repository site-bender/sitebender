import type BaseProps from "../../../../../types/index.ts"
import type FlightProps from "../../../../../types/Thing/Intangible/Trip/Flight/index.ts"

import Trip from "../index.tsx"

export type Props = FlightProps & BaseProps

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
	_type = "Flight",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Trip
			{...props}
			_type={_type}
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
