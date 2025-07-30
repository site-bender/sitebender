import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"

export interface PostalCodeRangeSpecificationProps {
	"@type"?: "PostalCodeRangeSpecification"
	postalCodeBegin?: Text
	postalCodeEnd?: Text
}

type PostalCodeRangeSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PostalCodeRangeSpecificationProps

export default PostalCodeRangeSpecification
