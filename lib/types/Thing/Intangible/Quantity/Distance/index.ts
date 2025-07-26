import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { QuantityProps } from "../index.ts"

export interface DistanceProps {
}

type Distance =
	& Thing
	& IntangibleProps
	& QuantityProps
	& DistanceProps

export default Distance
