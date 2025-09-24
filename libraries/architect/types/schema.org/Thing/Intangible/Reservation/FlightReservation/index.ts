import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

import QualitativeValueComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/QualitativeValue/index.tsx"

export type FlightReservationType = "FlightReservation"

export interface FlightReservationProps {
	"@type"?: FlightReservationType
	boardingGroup?: Text
	passengerPriorityStatus?:
		| QualitativeValue
		| Text
		| ReturnType<typeof QualitativeValueComponent>
	passengerSequenceNumber?: Text
	securityScreening?: Text
}

type FlightReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& FlightReservationProps

export default FlightReservation
