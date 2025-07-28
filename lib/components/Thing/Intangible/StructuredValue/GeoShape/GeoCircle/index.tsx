import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { GeoShapeProps } from "../../../../../../types/Thing/Intangible/StructuredValue/GeoShape/index.ts"
import type { GeoCircleProps } from "../../../../../../types/Thing/Intangible/StructuredValue/GeoShape/GeoCircle/index.ts"

import GeoShape from "../index.tsx"

export type Props = BaseComponentProps<
	GeoCircleProps,
	"GeoCircle",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps, GeoShapeProps>
>

export default function GeoCircle({
	geoMidpoint,
	geoRadius,
	schemaType = "GeoCircle",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<GeoShape
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				geoMidpoint,
				geoRadius,
				...subtypeProperties,
			}}
		/>
	)
}
