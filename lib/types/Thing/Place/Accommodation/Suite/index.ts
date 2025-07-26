import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"
import type BedDetails from "../../../Intangible/BedDetails/index.ts"
import type BedType from "../../../Intangible/Enumeration/QualitativeValue/BedType/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface SuiteProps {
	bed?: BedDetails | BedType | Text
	numberOfRooms?: Number | QuantitativeValue
	occupancy?: QuantitativeValue
}

type Suite =
	& Thing
	& PlaceProps
	& AccommodationProps
	& SuiteProps

export default Suite
