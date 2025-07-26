import type {
	Date,
	DateTime,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type Seat from "../Seat/index.ts"

export interface TicketProps {
	dateIssued?: Date | DateTime
	issuedBy?: Organization
	priceCurrency?: Text
	ticketedSeat?: Seat
	ticketNumber?: Text
	ticketToken?: Text | URL
	totalPrice?: Number | PriceSpecification | Text
	underName?: Organization | Person
}

type Ticket =
	& Thing
	& IntangibleProps
	& TicketProps

export default Ticket
