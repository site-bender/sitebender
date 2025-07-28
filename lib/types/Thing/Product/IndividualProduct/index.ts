import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"

import IndividualProductComponent from "../../../../../components/Thing/Product/IndividualProduct/index.tsx"

export interface IndividualProductProps {
	serialNumber?: Text
}

type IndividualProduct =
	& Thing
	& ProductProps
	& IndividualProductProps

export default IndividualProduct
