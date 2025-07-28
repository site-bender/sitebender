import type { Boolean, Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { ResidenceProps } from "../index.ts"

import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface ApartmentComplexProps {
	numberOfAccommodationUnits?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	numberOfAvailableAccommodationUnits?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	numberOfBedrooms?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	petsAllowed?: Boolean | Text
	tourBookingPage?: URL
}

type ApartmentComplex =
	& Thing
	& PlaceProps
	& ResidenceProps
	& ApartmentComplexProps

export default ApartmentComplex
