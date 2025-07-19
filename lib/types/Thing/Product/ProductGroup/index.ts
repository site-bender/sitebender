import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type Product from "../index.ts"
import type { ProductProps } from "../index.ts"

export interface ProductGroupProps {
	/** Indicates a [[Product]] that is a member of this [[ProductGroup]] (or [[ProductModel]]). */
	hasVariant?: Product
	/** Indicates a textual identifier for a ProductGroup. */
	productGroupID?: Text
	/** Indicates the property or properties by which the variants in a [[ProductGroup]] vary, e.g. their size, color etc. Schema.org properties can be referenced by their short name e.g. "color"; terms defined elsewhere can be referenced with their URIs. */
	variesBy?: Text | DefinedTerm
}

type ProductGroup =
	& Thing
	& ProductProps
	& ProductGroupProps

export default ProductGroup
