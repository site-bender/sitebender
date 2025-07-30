import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"
import type ProductGroup from "../ProductGroup/index.ts"

import ProductGroupComponent from "../../../../components/Thing/Product/ProductGroup/index.ts"
import ProductModelComponent from "../../../../components/Thing/Product/ProductModel/index.ts"

export interface ProductModelProps {
	"@type"?: "ProductModel"
	isVariantOf?:
		| ProductGroup
		| ProductModel
		| ReturnType<typeof ProductGroupComponent>
		| ReturnType<typeof ProductModelComponent>
	predecessorOf?: ProductModel | ReturnType<typeof ProductModelComponent>
	successorOf?: ProductModel | ReturnType<typeof ProductModelComponent>
}

type ProductModel = Thing & ProductProps & ProductModelProps

export default ProductModel
