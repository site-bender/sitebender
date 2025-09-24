import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"
import type ProductGroup from "../ProductGroup/index.ts"

import ProductGroupComponent from "../../../../../../codewright/src/define/Thing/Product/ProductGroup/index.tsx"
import ProductModelComponent from "../../../../../../codewright/src/define/Thing/Product/ProductModel/index.tsx"

export type ProductModelType = "ProductModel"

export interface ProductModelProps {
	"@type"?: ProductModelType
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
