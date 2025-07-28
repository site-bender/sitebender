import type Thing from "../../index.ts"
import type Place from "../../Place/index.ts"
import type { IntangibleProps } from "../index.ts"

import GeospatialGeometryComponent from "../../../../components/Thing/Intangible/GeospatialGeometry/index.ts"
import PlaceComponent from "../../../../components/Thing/Place/index.ts"

export interface GeospatialGeometryProps {
	geoContains?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoCoveredBy?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoCovers?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoCrosses?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoDisjoint?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoEquals?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoIntersects?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoOverlaps?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoTouches?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoWithin?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
}

type GeospatialGeometry = Thing & IntangibleProps & GeospatialGeometryProps

export default GeospatialGeometry
