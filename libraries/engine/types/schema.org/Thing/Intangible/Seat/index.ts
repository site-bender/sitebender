import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type QualitativeValue from "../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../index.ts"

import { QualitativeValue as QualitativeValueComponent } from "../../../../../components/index.tsx"

export type SeatType = "Seat"

export interface SeatProps {
	"@type"?: SeatType
	seatingType?:
		| QualitativeValue
		| Text
		| ReturnType<typeof QualitativeValueComponent>
	seatNumber?: Text
	seatRow?: Text
	seatSection?: Text
}

type Seat = Thing & IntangibleProps & SeatProps

export default Seat
