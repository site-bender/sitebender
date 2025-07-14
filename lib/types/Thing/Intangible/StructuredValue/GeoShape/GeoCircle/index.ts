import { Number, Text } from "../../../../../DataType/index.ts"
import Distance from "../../../Quantity/Distance/index.ts"
import GeoCoordinates from "../../GeoCoordinates/index.ts"
import GeoShape from "../index.ts"

export default interface GeoCircle extends GeoShape {
	/** Indicates the GeoCoordinates at the centre of a GeoShape, e.g. GeoCircle. */
	geoMidpoint?: GeoCoordinates
	/** Indicates the approximate radius of a GeoCircle (metres unless indicated otherwise via Distance notation). */
	geoRadius?: Text | Number | Distance
}
