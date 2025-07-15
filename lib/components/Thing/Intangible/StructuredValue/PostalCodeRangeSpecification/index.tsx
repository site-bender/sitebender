import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type PostalCodeRangeSpecificationProps from "../../../../../types/Thing/PostalCodeRangeSpecification/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	PostalCodeRangeSpecificationProps,
	"PostalCodeRangeSpecification",
	ExtractLevelProps<PostalCodeRangeSpecificationProps, StructuredValueProps>
>

export default function PostalCodeRangeSpecification(
	{
		postalCodeBegin,
		postalCodeEnd,
		schemaType = "PostalCodeRangeSpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				postalCodeBegin,
				postalCodeEnd,
				...subtypeProperties,
			}}
		/>
	)
}
