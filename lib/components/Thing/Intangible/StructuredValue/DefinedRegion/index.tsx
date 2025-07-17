import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DefinedRegionProps from "../../../../../types/Thing/DefinedRegion/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	DefinedRegionProps,
	"DefinedRegion",
	ExtractLevelProps<DefinedRegionProps, StructuredValueProps>
>

export default function DefinedRegion(
	{
		addressCountry,
		addressRegion,
		postalCode,
		postalCodePrefix,
		postalCodeRange,
		schemaType = "DefinedRegion",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
