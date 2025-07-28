import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"

import SomeProductsComponent from "../../../../../components/Thing/Product/SomeProducts/index.tsx"

export interface SomeProductsProps {
	inventoryLevel?: QuantitativeValue
}

type SomeProducts =
	& Thing
	& ProductProps
	& SomeProductsProps

export default SomeProducts
