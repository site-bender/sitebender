import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Place from "../../Place/index.ts"

import GeospatialGeometryComponent from "../../../../../components/Thing/Intangible/GeospatialGeometry/index.tsx"

export interface GeospatialGeometryProps {
	geoContains?: GeospatialGeometry | Place
	geoCoveredBy?: GeospatialGeometry | Place
	geoCovers?: GeospatialGeometry | Place
	geoCrosses?: GeospatialGeometry | Place
	geoDisjoint?: GeospatialGeometry | Place
	geoEquals?: GeospatialGeometry | Place
	geoIntersects?: GeospatialGeometry | Place
	geoOverlaps?: GeospatialGeometry | Place
	geoTouches?: GeospatialGeometry | Place
	geoWithin?: GeospatialGeometry | Place
}

type GeospatialGeometry =
	& Thing
	& IntangibleProps
	& GeospatialGeometryProps

export default GeospatialGeometry
