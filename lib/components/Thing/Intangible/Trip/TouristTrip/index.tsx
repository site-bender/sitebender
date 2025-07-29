import type BaseProps from "../../../../../types/index.ts"
import type TouristTripProps from "../../../../../types/Thing/Intangible/Trip/TouristTrip/index.ts"

import Trip from "../index.tsx"

export type Props = TouristTripProps & BaseProps

export default function TouristTrip({
	touristType,
	_type = "TouristTrip",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Trip
			{...props}
			_type={_type}
			subtypeProperties={{
				touristType,
				...subtypeProperties,
			}}
		/>
	)
}
