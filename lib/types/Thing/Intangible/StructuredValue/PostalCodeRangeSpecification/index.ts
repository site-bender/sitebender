import type { Text } from "../../../../DataType/index.ts"
import type StructuredValue from "../index.ts"

export default interface PostalCodeRangeSpecification extends StructuredValue {
	/** First postal code in a range (included). */
	postalCodeBegin?: Text
	/** Last postal code in the range (included). Needs to be after [[postalCodeBegin]]. */
	postalCodeEnd?: Text
}
