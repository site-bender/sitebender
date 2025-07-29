import type BaseProps from "../../../../../types/index.ts"
import type ReservationPackageProps from "../../../../../types/Thing/Intangible/Reservation/ReservationPackage/index.ts"

import Reservation from "../index.tsx"

export type Props = ReservationPackageProps & BaseProps

export default function ReservationPackage({
	subReservation,
	_type = "ReservationPackage",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Reservation
			{...props}
			_type={_type}
			subtypeProperties={{
				subReservation,
				...subtypeProperties,
			}}
		/>
	)
}
