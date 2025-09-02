import type { CollectionProps } from "../../CreativeWork/Collection/index.ts"
import type { CreativeWorkProps } from "../../CreativeWork/index.ts"
import type Thing from "../../index.ts"
import type TypeAndQuantityNode from "../../Intangible/StructuredValue/TypeAndQuantityNode/index.ts"
import type { ProductProps } from "../index.ts"

import { TypeAndQuantityNode as TypeAndQuantityNodeComponent } from "../../../../../components/index.tsx"

export type ProductCollectionType = "ProductCollection"

export interface ProductCollectionProps {
	"@type"?: ProductCollectionType
	includesObject?:
		| TypeAndQuantityNode
		| ReturnType<typeof TypeAndQuantityNodeComponent>
}

type ProductCollection =
	& Thing
	& CreativeWorkProps
	& CollectionProps
	& ProductProps
	& ProductCollectionProps

export default ProductCollection
