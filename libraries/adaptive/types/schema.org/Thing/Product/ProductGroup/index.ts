import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type Product from "../index.ts"
import type { ProductProps } from "../index.ts"

import { DefinedTerm as DefinedTermComponent } from "../../../../../components/index.tsx"
import { Product as ProductComponent } from "../../../../../components/index.tsx"

export type ProductGroupType = "ProductGroup"

export interface ProductGroupProps {
	"@type"?: ProductGroupType
	hasVariant?: Product | ReturnType<typeof ProductComponent>
	productGroupID?: Text
	variesBy?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
}

type ProductGroup = Thing & ProductProps & ProductGroupProps

export default ProductGroup
