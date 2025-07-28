import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { TripProps } from "../../../../../types/Thing/Intangible/Trip/index.ts"
import type { BusTripProps } from "../../../../../types/Thing/Intangible/Trip/BusTrip/index.ts"

import Trip from "../index.tsx"

export type Props = BaseComponentProps<
	BusTripProps,
	"BusTrip",
	ExtractLevelProps<ThingProps, IntangibleProps, TripProps>
>

export default function BusTrip({
	arrivalBusStop,
	busName,
	busNumber,
	departureBusStop,
	schemaType = "BusTrip",
	subtypeProperties = {},
	...props
}): Props {
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
