import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { GeospatialGeometryProps } from "../../../../types/Thing/Intangible/GeospatialGeometry/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	GeospatialGeometryProps,
	"GeospatialGeometry",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function GeospatialGeometry({
	geoContains,
	geoCoveredBy,
	geoCovers,
	geoCrosses,
	geoDisjoint,
	geoEquals,
	geoIntersects,
	geoOverlaps,
	geoTouches,
	geoWithin,
	schemaType = "GeospatialGeometry",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				geoContains,
				geoCoveredBy,
				geoCovers,
				geoCrosses,
				geoDisjoint,
				geoEquals,
				geoIntersects,
				geoOverlaps,
				geoTouches,
				geoWithin,
				...subtypeProperties,
			}}
		/>
	)
}
