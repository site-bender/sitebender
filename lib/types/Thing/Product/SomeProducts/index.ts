import type Thing from "../../index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { ProductProps } from "../index.ts"

import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export type SomeProductsType = "SomeProducts"

export interface SomeProductsProps {
	"@type"?: SomeProductsType
	inventoryLevel?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type SomeProducts = Thing & ProductProps & SomeProductsProps

export default SomeProducts
