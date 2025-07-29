import type BaseProps from "../../../../../types/index.ts"
import type BoatReservationProps from "../../../../../types/Thing/Intangible/Reservation/BoatReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = BoatReservationProps & BaseProps

export default function BoatReservation({
	_type = "BoatReservation",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Reservation
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
