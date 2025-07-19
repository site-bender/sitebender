import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"

export interface PostalCodeRangeSpecificationProps {
	/** First postal code in a range (included). */
	postalCodeBegin?: Text
	/** Last postal code in the range (included). Needs to be after [[postalCodeBegin]]. */
	postalCodeEnd?: Text
}

type PostalCodeRangeSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PostalCodeRangeSpecificationProps

export default PostalCodeRangeSpecification
