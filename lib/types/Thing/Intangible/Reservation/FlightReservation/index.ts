import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

export interface FlightReservationProps {
	/** The airline-specific indicator of boarding order / preference. */
	boardingGroup?: Text
	/** The priority status assigned to a passenger for security or boarding (e.g. FastTrack or Priority). */
	passengerPriorityStatus?: QualitativeValue | Text
	/** The passenger's sequence number as assigned by the airline. */
	passengerSequenceNumber?: Text
	/** The type of security screening the passenger is subject to. */
	securityScreening?: Text
}

type FlightReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& FlightReservationProps

export default FlightReservation
