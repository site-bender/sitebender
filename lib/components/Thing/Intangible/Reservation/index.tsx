import type BaseProps from "../../../../types/index.ts"
import type ReservationProps from "../../../../types/Thing/Intangible/Reservation/index.ts"

import Intangible from "../index.tsx"

export type Props = ReservationProps & BaseProps

export default function Reservation({
	bookingAgent,
	bookingTime,
	broker,
	modifiedTime,
	priceCurrency,
	programMembershipUsed,
	provider,
	reservationFor,
	reservationId,
	reservationStatus,
	reservedTicket,
	totalPrice,
	underName,
	_type = "Reservation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				bookingAgent,
				bookingTime,
				broker,
				modifiedTime,
				priceCurrency,
				programMembershipUsed,
				provider,
				reservationFor,
				reservationId,
				reservationStatus,
				reservedTicket,
				totalPrice,
				underName,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
