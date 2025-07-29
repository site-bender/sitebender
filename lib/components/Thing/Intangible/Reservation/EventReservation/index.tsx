import type BaseProps from "../../../../../types/index.ts"
import type EventReservationProps from "../../../../../types/Thing/Intangible/Reservation/EventReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = EventReservationProps & BaseProps

export default function EventReservation({
	_type = "EventReservation",
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
