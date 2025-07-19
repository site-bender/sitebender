// MotorizedBicycle extends Vehicle but adds no additional properties
import type Thing from "../../../index.ts"
import type { ProductProps } from "../../index.ts"
import type { VehicleProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MotorizedBicycleProps {}

type MotorizedBicycle =
	& Thing
	& ProductProps
	& VehicleProps
	& MotorizedBicycleProps

export default MotorizedBicycle
