import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type BedDetails from "../../../Intangible/BedDetails/index.ts"
import type BedType from "../../../Intangible/Enumeration/QualitativeValue/BedType/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"

import BedDetailsComponent from "../../../../../../src/define/Thing/Intangible/BedDetails/index.tsx"
import BedTypeComponent from "../../../../../../src/define/Thing/Intangible/Enumeration/QualitativeValue/BedType/index.tsx"
import QuantitativeValueComponent from "../../../../../../src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type SuiteType = "Suite"

export interface SuiteProps {
	"@type"?: SuiteType
	bed?:
		| BedDetails
		| BedType
		| Text
		| ReturnType<typeof BedDetailsComponent>
		| ReturnType<typeof BedTypeComponent>
	numberOfRooms?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	occupancy?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type Suite = Thing & PlaceProps & AccommodationProps & SuiteProps

export default Suite
