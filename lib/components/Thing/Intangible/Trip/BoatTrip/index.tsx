import type BaseProps from "../../../../../types/index.ts"
import type BoatTripProps from "../../../../../types/Thing/Intangible/Trip/BoatTrip/index.ts"

import Trip from "../index.tsx"

export type Props = BoatTripProps & BaseProps

export default function BoatTrip({
	arrivalBoatTerminal,
	departureBoatTerminal,
	_type = "BoatTrip",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Trip
			{...props}
			_type={_type}
			subtypeProperties={{
				arrivalBoatTerminal,
				departureBoatTerminal,
				...subtypeProperties,
			}}
		>{children}</Trip>
	)
}
