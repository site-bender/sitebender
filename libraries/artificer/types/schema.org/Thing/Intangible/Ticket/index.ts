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

import SeatComponent from "../../../../../../architect/src/define/Thing/Intangible/Seat/index.tsx"
import PriceSpecificationComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/PriceSpecification/index.tsx"
import OrganizationComponent from "../../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../architect/src/define/Thing/Person/index.tsx"

export type TicketType = "Ticket"

export interface TicketProps {
	"@type"?: TicketType
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
