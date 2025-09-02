import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { ProductProps } from "../../index.ts"
import type { VehicleProps } from "../index.ts"

import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

export type CarType = "Car"

export interface CarProps {
	"@type"?: CarType
	acrissCode?: Text
	roofLoad?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
}

type Car = Thing & ProductProps & VehicleProps & CarProps

export default Car
