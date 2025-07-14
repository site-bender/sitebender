import { Text } from "../../../DataType/index.ts"
import QualitativeValue from "../Enumeration/QualitativeValue/index.ts"
import Intangible from "../index.ts"

export default interface Seat extends Intangible {
	/** The location of the reserved seat (e.g., 27). */
	seatNumber?: Text
	/** The row location of the reserved seat (e.g., B). */
	seatRow?: Text
	/** The section location of the reserved seat (e.g. Orchestra). */
	seatSection?: Text
	/** The type/class of the seat. */
	seatingType?: QualitativeValue | Text
}
