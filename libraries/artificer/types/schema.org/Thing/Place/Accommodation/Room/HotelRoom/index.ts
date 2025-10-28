import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type BedDetails from "../../../../Intangible/BedDetails/index.ts"
import type BedType from "../../../../Intangible/Enumeration/QualitativeValue/BedType/index.ts"
import type QuantitativeValue from "../../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { AccommodationProps } from "../../index.ts"
import type { RoomProps } from "../index.ts"

import BedDetailsComponent from "../../../../../../../../pagewright/src/define/Thing/Intangible/BedDetails/index.tsx"
import BedTypeComponent from "../../../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/QualitativeValue/BedType/index.tsx"
import QuantitativeValueComponent from "../../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type HotelRoomType = "HotelRoom"

export interface HotelRoomProps {
	"@type"?: HotelRoomType
	bed?:
		| BedDetails
		| BedType
		| Text
		| ReturnType<typeof BedDetailsComponent>
		| ReturnType<typeof BedTypeComponent>
	occupancy?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type HotelRoom =
	& Thing
	& PlaceProps
	& AccommodationProps
	& RoomProps
	& HotelRoomProps

export default HotelRoom
