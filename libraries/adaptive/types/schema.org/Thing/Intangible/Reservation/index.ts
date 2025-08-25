import type { DateTime, Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type ReservationStatusType from "../Enumeration/StatusEnumeration/ReservationStatusType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ProgramMembership from "../ProgramMembership/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type Ticket from "../Ticket/index.ts"
import type { BoatReservationType } from "./BoatReservation/index.ts"
import type { BusReservationType } from "./BusReservation/index.ts"
import type { EventReservationType } from "./EventReservation/index.ts"
import type { FlightReservationType } from "./FlightReservation/index.ts"
import type { FoodEstablishmentReservationType } from "./FoodEstablishmentReservation/index.ts"
import type { LodgingReservationType } from "./LodgingReservation/index.ts"
import type { RentalCarReservationType } from "./RentalCarReservation/index.ts"
import type { ReservationPackageType } from "./ReservationPackage/index.ts"
import type { TaxiReservationType } from "./TaxiReservation/index.ts"
import type { TrainReservationType } from "./TrainReservation/index.ts"

import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { PriceSpecification as PriceSpecificationComponent } from "../../../../../components/index.tsx"
import { ProgramMembership as ProgramMembershipComponent } from "../../../../../components/index.tsx"
import { ReservationStatusType as ReservationStatusTypeComponent } from "../../../../../components/index.tsx"
import { Thing as ThingComponent } from "../../../../../components/index.tsx"
import { Ticket as TicketComponent } from "../../../../../components/index.tsx"

export type ReservationType =
	| "Reservation"
	| BusReservationType
	| ReservationPackageType
	| TrainReservationType
	| EventReservationType
	| LodgingReservationType
	| RentalCarReservationType
	| BoatReservationType
	| FoodEstablishmentReservationType
	| TaxiReservationType
	| FlightReservationType

export interface ReservationProps {
	"@type"?: ReservationType
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
