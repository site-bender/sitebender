import type { Number, Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type Distance from "../../../Quantity/Distance/index.ts"
import type GeoCoordinates from "../../GeoCoordinates/index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { GeoShapeProps } from "../index.ts"

import DistanceComponent from "../../../../../../../../codewright/src/define/Thing/Intangible/Quantity/Distance/index.tsx"
import GeoCoordinatesComponent from "../../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/GeoCoordinates/index.tsx"

export type GeoCircleType = "GeoCircle"

export interface GeoCircleProps {
	"@type"?: GeoCircleType
	geoMidpoint?: GeoCoordinates | ReturnType<typeof GeoCoordinatesComponent>
	geoRadius?: Distance | Number | Text | ReturnType<typeof DistanceComponent>
}

type GeoCircle =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& GeoShapeProps
	& GeoCircleProps

export default GeoCircle
