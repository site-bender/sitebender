import type BaseProps from "../../../../../types/index.ts"
import type DefinedRegionProps from "../../../../../types/Thing/Intangible/StructuredValue/DefinedRegion/index.ts"

import StructuredValue from "../index.tsx"

export type Props = DefinedRegionProps & BaseProps

export default function DefinedRegion({
	addressCountry,
	addressRegion,
	postalCode,
	postalCodePrefix,
	postalCodeRange,
	_type = "DefinedRegion",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				addressCountry,
				addressRegion,
				postalCode,
				postalCodePrefix,
				postalCodeRange,
				...subtypeProperties,
			}}
		>
			{children}
		</StructuredValue>
	)
}
