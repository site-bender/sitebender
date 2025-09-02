import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type BedDetails from "../../../Intangible/BedDetails/index.ts"
import type BedType from "../../../Intangible/Enumeration/QualitativeValue/BedType/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"

import { BedDetails as BedDetailsComponent } from "../../../../../../components/index.tsx"
import { BedType as BedTypeComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

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
	occupancy?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
}

type Suite = Thing & PlaceProps & AccommodationProps & SuiteProps

export default Suite
