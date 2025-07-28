import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"

import PostalCodeRangeSpecificationComponent from "../../../../../../components/Thing/Intangible/StructuredValue/PostalCodeRangeSpecification/index.tsx"

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
