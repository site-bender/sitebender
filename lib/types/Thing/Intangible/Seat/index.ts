import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type QualitativeValue from "../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../index.ts"

export interface SeatProps {
	/** The location of the reserved seat (e.g., 27). */
	seatNumber?: Text
	/** The row location of the reserved seat (e.g., B). */
	seatRow?: Text
	/** The section location of the reserved seat (e.g. Orchestra). */
	seatSection?: Text
	/** The type/class of the seat. */
	seatingType?: QualitativeValue | Text
}

type Seat =
	& Thing
	& IntangibleProps
	& SeatProps

export default Seat
