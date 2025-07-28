import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

import ApartmentComponent from "../../../../../../components/Thing/Place/Accommodation/Apartment/index.tsx"

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
