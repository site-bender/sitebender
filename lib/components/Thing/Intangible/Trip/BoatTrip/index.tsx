import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { TripProps } from "../../../../../types/Thing/Intangible/Trip/index.ts"
import type { BoatTripProps } from "../../../../../types/Thing/Intangible/Trip/BoatTrip/index.ts"

import Trip from "../index.tsx"

export type Props = BaseComponentProps<
	BoatTripProps,
	"BoatTrip",
	ExtractLevelProps<ThingProps, IntangibleProps, TripProps>
>

export default function BoatTrip({
	arrivalBoatTerminal,
	departureBoatTerminal,
	schemaType = "BoatTrip",
	subtypeProperties = {},
	...props
}): Props {
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
