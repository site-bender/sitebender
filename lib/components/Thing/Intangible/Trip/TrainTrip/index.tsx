import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { TripProps } from "../../../../../types/Thing/Intangible/Trip/index.ts"
import type { TrainTripProps } from "../../../../../types/Thing/Intangible/Trip/TrainTrip/index.ts"

import Trip from "../index.tsx"

export type Props = BaseComponentProps<
	TrainTripProps,
	"TrainTrip",
	ExtractLevelProps<ThingProps, IntangibleProps, TripProps>
>

export default function TrainTrip({
	arrivalPlatform,
	arrivalStation,
	departurePlatform,
	departureStation,
	trainName,
	trainNumber,
	schemaType = "TrainTrip",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Trip
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				arrivalPlatform,
				arrivalStation,
				departurePlatform,
				departureStation,
				trainName,
				trainNumber,
				...subtypeProperties,
			}}
		/>
	)
}
