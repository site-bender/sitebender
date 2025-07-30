import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { ProductProps } from "../../index.ts"
import type { VehicleProps } from "../index.ts"

import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface BusOrCoachProps {
	"@type"?: "BusOrCoach"
	acrissCode?: Text
	roofLoad?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
}

type BusOrCoach = Thing & ProductProps & VehicleProps & BusOrCoachProps

export default BusOrCoach
