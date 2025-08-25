import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"

import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

export type ApartmentType = "Apartment"

export interface ApartmentProps {
	"@type"?: ApartmentType
	numberOfRooms?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	occupancy?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
}

type Apartment = Thing & PlaceProps & AccommodationProps & ApartmentProps

export default Apartment
