import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"

export interface IndividualProductProps {
	"@type"?: "IndividualProduct"
	serialNumber?: Text
}

type IndividualProduct = Thing & ProductProps & IndividualProductProps

export default IndividualProduct
