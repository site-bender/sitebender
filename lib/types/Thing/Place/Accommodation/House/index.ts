import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

import HouseComponent from "../../../../../../components/Thing/Place/Accommodation/House/index.tsx"

export interface HouseProps {
	numberOfRooms?: Number | QuantitativeValue
}

type House =
	& Thing
	& PlaceProps
	& AccommodationProps
	& HouseProps

export default House
