import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type ReservationProps from "../../../../types/Thing/Reservation/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	ReservationProps,
	"Reservation",
	ExtractLevelProps<ReservationProps, IntangibleProps>
>

export default function Reservation(
	{
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
		schemaType = "Reservation",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
		/>
	)
}
