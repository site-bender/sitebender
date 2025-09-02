import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"
import type ProductGroup from "../ProductGroup/index.ts"

import { ProductGroup as ProductGroupComponent } from "../../../../../components/index.tsx"
import { ProductModel as ProductModelComponent } from "../../../../../components/index.tsx"

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
