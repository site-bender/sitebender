import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FlightProps from "../../../../../types/Thing/Flight/index.ts"
import type TripProps from "../../../../../types/Thing/Trip/index.ts"

import Trip from "./index.tsx"

export type Props = BaseComponentProps<
	FlightProps,
	"Flight",
	ExtractLevelProps<FlightProps, TripProps>
>

export default function Flight(
	{
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
	}: Props,
) {
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
