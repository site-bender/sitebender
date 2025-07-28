import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"

import FlightReservationComponent from "../../../../../../components/Thing/Intangible/Reservation/FlightReservation/index.tsx"

export interface FlightReservationProps {
	boardingGroup?: Text
	passengerPriorityStatus?: QualitativeValue | Text
	passengerSequenceNumber?: Text
	securityScreening?: Text
}

type FlightReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& FlightReservationProps

export default FlightReservation
