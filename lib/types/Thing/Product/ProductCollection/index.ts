import type Collection from "../../CreativeWork/Collection/index.ts"
import type TypeAndQuantityNode from "../../Intangible/StructuredValue/TypeAndQuantityNode/index.ts"
import type Product from "../index.ts"

export default interface ProductCollection extends Product, Collection {
	/** This links to a node or nodes indicating the exact quantity of the products included in  an [[Offer]] or [[ProductCollection]]. */
	includesObject?: TypeAndQuantityNode
}
