import TypeAndQuantityNode from "../../Intangible/StructuredValue/TypeAndQuantityNode/index.ts"
import Product from "../index.ts"

export default interface ProductCollection extends Product {
	/** This links to a node or nodes indicating the exact quantity of the products included in  an [[Offer]] or [[ProductCollection]]. */
	includesObject?: TypeAndQuantityNode
}
