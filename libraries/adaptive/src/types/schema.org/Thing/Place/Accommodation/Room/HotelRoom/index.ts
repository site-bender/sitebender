import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type BedDetails from "../../../../Intangible/BedDetails/index.ts"
import type BedType from "../../../../Intangible/Enumeration/QualitativeValue/BedType/index.ts"
import type QuantitativeValue from "../../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { AccommodationProps } from "../../index.ts"
import type { RoomProps } from "../index.ts"

import { BedDetails as BedDetailsComponent } from "../../../../../../../components/index.tsx"
import { BedType as BedTypeComponent } from "../../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../../components/index.tsx"

export type HotelRoomType = "HotelRoom"

export interface HotelRoomProps {
	"@type"?: HotelRoomType
	bed?:
		| BedDetails
		| BedType
		| Text
		| ReturnType<typeof BedDetailsComponent>
		| ReturnType<typeof BedTypeComponent>
	occupancy?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
}

type HotelRoom =
	& Thing
	& PlaceProps
	& AccommodationProps
	& RoomProps
	& HotelRoomProps

export default HotelRoom
