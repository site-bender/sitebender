import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type Product from "../index.ts"

import ProductGroupComponent from "../../../../../components/Thing/Product/ProductGroup/index.tsx"

export interface ProductGroupProps {
	hasVariant?: Product
	productGroupID?: Text
	variesBy?: DefinedTerm | Text
}

type ProductGroup =
	& Thing
	& ProductProps
	& ProductGroupProps

export default ProductGroup
