import type { DateTime, Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type ProgramMembership from "../ProgramMembership/index.ts"
import type ReservationStatusType from "../Enumeration/StatusEnumeration/ReservationStatusType/index.ts"
import type Ticket from "../Ticket/index.ts"

import ReservationComponent from "../../../../../components/Thing/Intangible/Reservation/index.tsx"

export interface ReservationProps {
	bookingAgent?: Organization | Person
	bookingTime?: DateTime
	broker?: Organization | Person
	modifiedTime?: DateTime
	priceCurrency?: Text
	programMembershipUsed?: ProgramMembership
	provider?: Organization | Person
	reservationFor?: Thing
	reservationId?: Text
	reservationStatus?: ReservationStatusType
	reservedTicket?: Ticket
	totalPrice?: Number | PriceSpecification | Text
	underName?: Organization | Person
}

type Reservation =
	& Thing
	& IntangibleProps
	& ReservationProps

export default Reservation
