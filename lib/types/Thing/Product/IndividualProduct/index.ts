import { Text } from "../../../DataType/index.ts"
import Product from "../index.ts"

export default interface IndividualProduct extends Product {
	/** The serial number or any alphanumeric identifier of a particular product. When attached to an offer, it is a shortcut for the serial number of the product included in the offer. */
	serialNumber?: Text
}
