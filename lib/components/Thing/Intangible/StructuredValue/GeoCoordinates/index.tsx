import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { GeoCoordinatesProps } from "../../../../../types/Thing/Intangible/StructuredValue/GeoCoordinates/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	GeoCoordinatesProps,
	"GeoCoordinates",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function GeoCoordinates({
	address,
	addressCountry,
	elevation,
	latitude,
	longitude,
	postalCode,
	schemaType = "GeoCoordinates",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				address,
				addressCountry,
				elevation,
				latitude,
				longitude,
				postalCode,
				...subtypeProperties,
			}}
		/>
	)
}
