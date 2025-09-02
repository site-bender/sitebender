import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { QuantityProps } from "../index.ts"

export type DistanceType = "Distance"

export interface DistanceProps {
	"@type"?: DistanceType
}

type Distance = Thing & IntangibleProps & QuantityProps & DistanceProps

export default Distance
