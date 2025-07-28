import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"
import type ProductGroup from "../ProductGroup/index.ts"

import ProductModelComponent from "../../../../../components/Thing/Product/ProductModel/index.tsx"

export interface ProductModelProps {
	isVariantOf?: ProductGroup | ProductModel
	predecessorOf?: ProductModel
	successorOf?: ProductModel
}

type ProductModel =
	& Thing
	& ProductProps
	& ProductModelProps

export default ProductModel
