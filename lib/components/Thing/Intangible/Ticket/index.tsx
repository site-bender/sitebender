import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type TicketProps from "../../../../types/Thing/Ticket/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	TicketProps,
	"Ticket",
	ExtractLevelProps<TicketProps, IntangibleProps>
>

export default function Ticket(
	{
		dateIssued,
		issuedBy,
		priceCurrency,
		ticketNumber,
		ticketToken,
		ticketedSeat,
		totalPrice,
		underName,
		schemaType = "Ticket",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				dateIssued,
				issuedBy,
				priceCurrency,
				ticketNumber,
				ticketToken,
				ticketedSeat,
				totalPrice,
				underName,
				...subtypeProperties,
			}}
		/>
	)
}
