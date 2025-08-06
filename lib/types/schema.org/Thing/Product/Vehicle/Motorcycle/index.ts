import type Thing from "../../../index.ts"
import type { ProductProps } from "../../index.ts"
import type { VehicleProps } from "../index.ts"

export type MotorcycleType = "Motorcycle"

export interface MotorcycleProps {
	"@type"?: MotorcycleType
}

type Motorcycle = Thing & ProductProps & VehicleProps & MotorcycleProps

export default Motorcycle
