import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"

export interface PostalCodeRangeSpecificationProps {
	postalCodeBegin?: Text
	postalCodeEnd?: Text
}

type PostalCodeRangeSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PostalCodeRangeSpecificationProps

export default PostalCodeRangeSpecification
