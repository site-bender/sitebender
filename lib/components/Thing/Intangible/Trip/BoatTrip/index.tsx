import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BoatTripProps from "../../../../../types/Thing/BoatTrip/index.ts"
import type TripProps from "../../../../../types/Thing/Trip/index.ts"

import Trip from "./index.tsx"

export type Props = BaseComponentProps<
	BoatTripProps,
	"BoatTrip",
	ExtractLevelProps<BoatTripProps, TripProps>
>

export default function BoatTrip(
	{
		arrivalBoatTerminal,
		departureBoatTerminal,
		schemaType = "BoatTrip",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Trip
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				arrivalBoatTerminal,
				departureBoatTerminal,
				...subtypeProperties,
			}}
		/>
	)
}
