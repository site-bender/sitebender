import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface ApartmentProps {
	numberOfRooms?: Number | QuantitativeValue
	occupancy?: QuantitativeValue
}

type Apartment =
	& Thing
	& PlaceProps
	& AccommodationProps
	& ApartmentProps

export default Apartment
