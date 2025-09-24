import type Thing from "../../../index.ts"
import type { ProductProps } from "../../index.ts"
import type { VehicleProps } from "../index.ts"

export type MotorizedBicycleType = "MotorizedBicycle"

export interface MotorizedBicycleProps {
	"@type"?: MotorizedBicycleType
}

type MotorizedBicycle =
	& Thing
	& ProductProps
	& VehicleProps
	& MotorizedBicycleProps

export default MotorizedBicycle
