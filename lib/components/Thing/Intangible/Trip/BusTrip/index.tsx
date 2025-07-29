import type BaseProps from "../../../../../types/index.ts"
import type BusTripProps from "../../../../../types/Thing/Intangible/Trip/BusTrip/index.ts"

import Trip from "../index.tsx"

export type Props = BusTripProps & BaseProps

export default function BusTrip({
	arrivalBusStop,
	busName,
	busNumber,
	departureBusStop,
	_type = "BusTrip",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Trip
			{...props}
			_type={_type}
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
