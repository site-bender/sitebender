import type { Number, Text } from "../../../../../DataType/index.ts"
import type Distance from "../../../Quantity/Distance/index.ts"
import type GeoCoordinates from "../../GeoCoordinates/index.ts"
import type GeoShape from "../index.ts"

export default interface GeoCircle extends GeoShape {
	/** Indicates the GeoCoordinates at the centre of a GeoShape, e.g. GeoCircle. */
	geoMidpoint?: GeoCoordinates
	/** Indicates the approximate radius of a GeoCircle (metres unless indicated otherwise via Distance notation). */
	geoRadius?: Text | Number | Distance
}
