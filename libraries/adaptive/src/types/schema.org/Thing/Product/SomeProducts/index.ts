import type Thing from "../../index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { ProductProps } from "../index.ts"

import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"

export type SomeProductsType = "SomeProducts"

export interface SomeProductsProps {
	"@type"?: SomeProductsType
	inventoryLevel?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type SomeProducts = Thing & ProductProps & SomeProductsProps

export default SomeProducts
