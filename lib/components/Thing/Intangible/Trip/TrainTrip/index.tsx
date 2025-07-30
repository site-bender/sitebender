import type BaseProps from "../../../../../types/index.ts"
import type TrainTripProps from "../../../../../types/Thing/Intangible/Trip/TrainTrip/index.ts"

import Trip from "../index.tsx"

export type Props = TrainTripProps & BaseProps

export default function TrainTrip({
	arrivalPlatform,
	arrivalStation,
	departurePlatform,
	departureStation,
	trainName,
	trainNumber,
	_type = "TrainTrip",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Trip
			{...props}
			_type={_type}
			subtypeProperties={{
				arrivalPlatform,
				arrivalStation,
				departurePlatform,
				departureStation,
				trainName,
				trainNumber,
				...subtypeProperties,
			}}
		>{children}</Trip>
	)
}
