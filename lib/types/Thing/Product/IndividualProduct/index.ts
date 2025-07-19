import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"

export interface IndividualProductProps {
	/** The serial number or any alphanumeric identifier of a particular product. When attached to an offer, it is a shortcut for the serial number of the product included in the offer. */
	serialNumber?: Text
}

type IndividualProduct =
	& Thing
	& ProductProps
	& IndividualProductProps

export default IndividualProduct
