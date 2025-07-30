import type BaseProps from "../../../../../types/index.ts"
import type BusReservationProps from "../../../../../types/Thing/Intangible/Reservation/BusReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = BusReservationProps & BaseProps

export default function BusReservation({
	_type = "BusReservation",
	children,
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
		>{children}</Reservation>
	)
}
