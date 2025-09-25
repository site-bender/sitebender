import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"

export type IndividualProductType = "IndividualProduct"

export interface IndividualProductProps {
	"@type"?: IndividualProductType
	serialNumber?: Text
}

type IndividualProduct = Thing & ProductProps & IndividualProductProps

export default IndividualProduct
