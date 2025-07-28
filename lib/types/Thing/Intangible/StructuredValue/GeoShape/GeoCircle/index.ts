import type { Number, Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { GeoShapeProps } from "../index.ts"
import type Distance from "../../../Quantity/Distance/index.ts"
import type GeoCoordinates from "../../GeoCoordinates/index.ts"

import GeoCircleComponent from "../../../../../../../components/Thing/Intangible/StructuredValue/GeoShape/GeoCircle/index.tsx"

export interface GeoCircleProps {
	geoMidpoint?: GeoCoordinates
	geoRadius?: Distance | Number | Text
}

type GeoCircle =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& GeoShapeProps
	& GeoCircleProps

export default GeoCircle
