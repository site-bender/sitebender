import type { Number } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type QuantitativeValue from "../../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { AccommodationProps } from "../../index.ts"
import type { HouseProps } from "../index.ts"

import QuantitativeValueComponent from "../../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export type SingleFamilyResidenceType = "SingleFamilyResidence"

export interface SingleFamilyResidenceProps {
	"@type"?: SingleFamilyResidenceType
	numberOfRooms?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	occupancy?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
}

type SingleFamilyResidence =
	& Thing
	& PlaceProps
	& AccommodationProps
	& HouseProps
	& SingleFamilyResidenceProps

export default SingleFamilyResidence
