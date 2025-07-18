import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BusTripProps from "../../../../../types/Thing/BusTrip/index.ts"
import type TripProps from "../../../../../types/Thing/Trip/index.ts"

import Trip from "../index.tsx"

export type Props = BaseComponentProps<
	BusTripProps,
	"BusTrip",
	ExtractLevelProps<BusTripProps, TripProps>
>

export default function BusTrip(
	{
		arrivalBusStop,
		busName,
		busNumber,
		departureBusStop,
		schemaType = "BusTrip",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Trip
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				arrivalBusStop,
				busName,
				busNumber,
				departureBusStop,
				...subtypeProperties,
			}}
		/>
	)
}
