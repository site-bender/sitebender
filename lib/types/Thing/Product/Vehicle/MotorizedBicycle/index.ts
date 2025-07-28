import type Thing from "../../../index.ts"
import type { ProductProps } from "../../index.ts"
import type { VehicleProps } from "../index.ts"

import MotorizedBicycleComponent from "../../../../../../components/Thing/Product/Vehicle/MotorizedBicycle/index.tsx"

export interface MotorizedBicycleProps {
}

type MotorizedBicycle =
	& Thing
	& ProductProps
	& VehicleProps
	& MotorizedBicycleProps

export default MotorizedBicycle
