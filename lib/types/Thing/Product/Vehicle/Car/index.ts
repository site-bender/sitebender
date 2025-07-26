import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ProductProps } from "../../index.ts"
import type { VehicleProps } from "../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface CarProps {
	acrissCode?: Text
	roofLoad?: QuantitativeValue
}

type Car =
	& Thing
	& ProductProps
	& VehicleProps
	& CarProps

export default Car
