import type {
	Date,
	DateTime,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Seat from "../Seat/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"

import SeatComponent from "../../../../components/Thing/Intangible/Seat/index.ts"
import PriceSpecificationComponent from "../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface TicketProps {
	dateIssued?: Date | DateTime
	issuedBy?: Organization | ReturnType<typeof OrganizationComponent>
	priceCurrency?: Text
	ticketedSeat?: Seat | ReturnType<typeof SeatComponent>
	ticketNumber?: Text
	ticketToken?: Text | URL
	totalPrice?:
		| Number
		| PriceSpecification
		| Text
		| ReturnType<typeof PriceSpecificationComponent>
	underName?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type Ticket = Thing & IntangibleProps & TicketProps

export default Ticket
