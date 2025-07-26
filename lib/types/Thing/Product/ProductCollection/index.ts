import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../../CreativeWork/index.ts"
import type { CollectionProps } from "../../CreativeWork/Collection/index.ts"
import type { ProductProps } from "../index.ts"
import type TypeAndQuantityNode from "../../Intangible/StructuredValue/TypeAndQuantityNode/index.ts"

export interface ProductCollectionProps {
	includesObject?: TypeAndQuantityNode
}

type ProductCollection =
	& Thing
	& CreativeWorkProps
	& CollectionProps
	& ProductProps
	& ProductCollectionProps

export default ProductCollection
