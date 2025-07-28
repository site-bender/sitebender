import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { PostalCodeRangeSpecificationProps } from "../../../../../types/Thing/Intangible/StructuredValue/PostalCodeRangeSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	PostalCodeRangeSpecificationProps,
	"PostalCodeRangeSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function PostalCodeRangeSpecification({
	postalCodeBegin,
	postalCodeEnd,
	schemaType = "PostalCodeRangeSpecification",
	subtypeProperties = {},
	...props
}): Props {
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
