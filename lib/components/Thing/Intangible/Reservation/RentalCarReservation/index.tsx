import type BaseProps from "../../../../../types/index.ts"
import type { RentalCarReservationProps } from "../../../../../types/Thing/Intangible/Reservation/RentalCarReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = RentalCarReservationProps & BaseProps

export default function RentalCarReservation({
	dropoffLocation,
	dropoffTime,
	pickupLocation,
	pickupTime,
	_type = "RentalCarReservation",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Reservation
			{...props}
			_type={_type}
			subtypeProperties={{
				dropoffLocation,
				dropoffTime,
				pickupLocation,
				pickupTime,
				...subtypeProperties,
			}}
		/>
	)
}
