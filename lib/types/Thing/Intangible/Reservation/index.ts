import type { DateTime, Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type ReservationStatusType from "../Enumeration/StatusEnumeration/ReservationStatusType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ProgramMembership from "../ProgramMembership/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type Ticket from "../Ticket/index.ts"

import ThingComponent from "../../../../components/Thing/index.ts"
import ReservationStatusTypeComponent from "../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/ReservationStatusType/index.ts"
import ProgramMembershipComponent from "../../../../components/Thing/Intangible/ProgramMembership/index.ts"
import PriceSpecificationComponent from "../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"
import TicketComponent from "../../../../components/Thing/Intangible/Ticket/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface ReservationProps {
	bookingAgent?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	bookingTime?: DateTime
	broker?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	modifiedTime?: DateTime
	priceCurrency?: Text
	programMembershipUsed?:
		| ProgramMembership
		| ReturnType<typeof ProgramMembershipComponent>
	provider?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	reservationFor?: Thing | ReturnType<typeof ThingComponent>
	reservationId?: Text
	reservationStatus?:
		| ReservationStatusType
		| ReturnType<typeof ReservationStatusTypeComponent>
	reservedTicket?: Ticket | ReturnType<typeof TicketComponent>
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

type Reservation = Thing & IntangibleProps & ReservationProps

export default Reservation
