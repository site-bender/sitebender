import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type { DistanceType } from "./Distance/index.ts"
import type { DurationType } from "./Duration/index.ts"
import type { EnergyType } from "./Energy/index.ts"
import type { MassType } from "./Mass/index.ts"

export type QuantityType =
	| "Quantity"
	| MassType
	| EnergyType
	| DistanceType
	| DurationType

export interface QuantityProps {
	"@type"?: QuantityType
}

type Quantity = Thing & IntangibleProps & QuantityProps

export default Quantity
