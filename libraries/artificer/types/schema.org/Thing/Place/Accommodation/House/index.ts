import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"
import type { SingleFamilyResidenceType } from "./SingleFamilyResidence/index.ts"

import QuantitativeValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type HouseType = "House" | SingleFamilyResidenceType

export interface HouseProps {
	"@type"?: HouseType
	numberOfRooms?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type House = Thing & PlaceProps & AccommodationProps & HouseProps

export default House
