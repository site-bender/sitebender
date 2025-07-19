import type Thing from "../../index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { ProductProps } from "../index.ts"

export interface SomeProductsProps {
	/** The current approximate inventory level for the item or items. */
	inventoryLevel?: QuantitativeValue
}

type SomeProducts =
	& Thing
	& ProductProps
	& SomeProductsProps

export default SomeProducts
