import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { GeoShapeProps } from "../../../../../types/Thing/Intangible/StructuredValue/GeoShape/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	GeoShapeProps,
	"GeoShape",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function GeoShape({
	address,
	addressCountry,
	box,
	circle,
	elevation,
	line,
	polygon,
	postalCode,
	schemaType = "GeoShape",
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
				box,
				circle,
				elevation,
				line,
				polygon,
				postalCode,
				...subtypeProperties,
			}}
		/>
	)
}
