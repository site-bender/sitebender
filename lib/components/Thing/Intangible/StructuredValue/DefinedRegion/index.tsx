import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { DefinedRegionProps } from "../../../../../types/Thing/Intangible/StructuredValue/DefinedRegion/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	DefinedRegionProps,
	"DefinedRegion",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function DefinedRegion({
	addressCountry,
	addressRegion,
	postalCode,
	postalCodePrefix,
	postalCodeRange,
	schemaType = "DefinedRegion",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				addressCountry,
				addressRegion,
				postalCode,
				postalCodePrefix,
				postalCodeRange,
				...subtypeProperties,
			}}
		/>
	)
}
