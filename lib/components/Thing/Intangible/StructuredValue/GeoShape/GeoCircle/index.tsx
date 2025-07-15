import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type GeoCircleProps from "../../../../../../types/Thing/GeoCircle/index.ts"
import type GeoShapeProps from "../../../../../../types/Thing/GeoShape/index.ts"

import GeoShape from "./index.tsx"

export type Props = BaseComponentProps<
	GeoCircleProps,
	"GeoCircle",
	ExtractLevelProps<GeoCircleProps, GeoShapeProps>
>

export default function GeoCircle(
	{
		geoMidpoint,
		geoRadius,
		schemaType = "GeoCircle",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
