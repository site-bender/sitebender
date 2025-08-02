import type BaseProps from "../../../../types/index.ts"
import type TripProps from "../../../../types/Thing/Intangible/Trip/index.ts"

import Intangible from "../index.tsx"

export type Props = TripProps & BaseProps

export default function Trip({
	arrivalTime,
	departureTime,
	itinerary,
	offers,
	partOfTrip,
	provider,
	subTrip,
	tripOrigin,
	_type = "Trip",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				arrivalTime,
				departureTime,
				itinerary,
				offers,
				partOfTrip,
				provider,
				subTrip,
				tripOrigin,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
