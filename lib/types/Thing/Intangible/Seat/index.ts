import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type QualitativeValue from "../Enumeration/QualitativeValue/index.ts"

import SeatComponent from "../../../../../components/Thing/Intangible/Seat/index.tsx"

export interface SeatProps {
	seatingType?: QualitativeValue | Text
	seatNumber?: Text
	seatRow?: Text
	seatSection?: Text
}

type Seat =
	& Thing
	& IntangibleProps
	& SeatProps

export default Seat
