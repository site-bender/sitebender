import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ProductProps } from "../../index.ts"
import type { VehicleProps } from "../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

import BusOrCoachComponent from "../../../../../../components/Thing/Product/Vehicle/BusOrCoach/index.tsx"

export interface BusOrCoachProps {
	acrissCode?: Text
	roofLoad?: QuantitativeValue
}

type BusOrCoach =
	& Thing
	& ProductProps
	& VehicleProps
	& BusOrCoachProps

export default BusOrCoach
