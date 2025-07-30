import type BaseProps from "../../../../types/index.ts"
import type GeospatialGeometryProps from "../../../../types/Thing/Intangible/GeospatialGeometry/index.ts"

import Intangible from "../index.tsx"

export type Props = GeospatialGeometryProps & BaseProps

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
	_type = "GeospatialGeometry",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
		>{children}</Intangible>
	)
}
