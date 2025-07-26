import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { AccommodationProps } from "../../index.ts"
import type { RoomProps } from "../index.ts"
import type BedDetails from "../../../../Intangible/BedDetails/index.ts"
import type BedType from "../../../../Intangible/Enumeration/QualitativeValue/BedType/index.ts"
import type QuantitativeValue from "../../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface HotelRoomProps {
	bed?: BedDetails | BedType | Text
	occupancy?: QuantitativeValue
}

type HotelRoom =
	& Thing
	& PlaceProps
	& AccommodationProps
	& RoomProps
	& HotelRoomProps

export default HotelRoom
