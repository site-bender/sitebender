import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type Product from "../index.ts"
import type { ProductProps } from "../index.ts"

import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import ProductComponent from "../../../../components/Thing/Product/index.ts"

export interface ProductGroupProps {
	"@type"?: "ProductGroup"
	hasVariant?: Product | ReturnType<typeof ProductComponent>
	productGroupID?: Text
	variesBy?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
}

type ProductGroup = Thing & ProductProps & ProductGroupProps

export default ProductGroup
