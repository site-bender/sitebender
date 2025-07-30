import type BaseProps from "../../../../../types/index.ts"
import type PostalCodeRangeSpecificationProps from "../../../../../types/Thing/Intangible/StructuredValue/PostalCodeRangeSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = PostalCodeRangeSpecificationProps & BaseProps

export default function PostalCodeRangeSpecification({
	postalCodeBegin,
	postalCodeEnd,
	_type = "PostalCodeRangeSpecification",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				postalCodeBegin,
				postalCodeEnd,
				...subtypeProperties,
			}}
		>{children}</StructuredValue>
	)
}
