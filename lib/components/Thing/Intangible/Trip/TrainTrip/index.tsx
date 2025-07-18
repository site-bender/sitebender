import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type TrainTripProps from "../../../../../types/Thing/TrainTrip/index.ts"
import type TripProps from "../../../../../types/Thing/Trip/index.ts"

import Trip from "../index.tsx"

export type Props = BaseComponentProps<
	TrainTripProps,
	"TrainTrip",
	ExtractLevelProps<TrainTripProps, TripProps>
>

export default function TrainTrip(
	{
		arrivalPlatform,
		arrivalStation,
		departurePlatform,
		departureStation,
		trainName,
		trainNumber,
		schemaType = "TrainTrip",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
