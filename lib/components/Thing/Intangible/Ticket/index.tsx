import type BaseProps from "../../../../types/index.ts"
import type { TicketProps } from "../../../../types/Thing/Intangible/Ticket/index.ts"

import Intangible from "../index.tsx"

export type Props = TicketProps & BaseProps

export default function Ticket({
	dateIssued,
	issuedBy,
	priceCurrency,
	ticketedSeat,
	ticketNumber,
	ticketToken,
	totalPrice,
	underName,
	_type = "Ticket",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				dateIssued,
				issuedBy,
				priceCurrency,
				ticketedSeat,
				ticketNumber,
				ticketToken,
				totalPrice,
				underName,
				...subtypeProperties,
			}}
		/>
	)
}
