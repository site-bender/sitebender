import { Text } from "../../../../DataType/index.ts"
import QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import Reservation from "../index.ts"

export default interface FlightReservation extends Reservation {
	/** The airline-specific indicator of boarding order / preference. */
	boardingGroup?: Text
	/** The priority status assigned to a passenger for security or boarding (e.g. FastTrack or Priority). */
	passengerPriorityStatus?: QualitativeValue | Text
	/** The passenger's sequence number as assigned by the airline. */
	passengerSequenceNumber?: Text
	/** The type of security screening the passenger is subject to. */
	securityScreening?: Text
}
