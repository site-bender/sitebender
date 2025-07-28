import type Thing from "../../../index.ts"
import type { ProductProps } from "../../index.ts"
import type { VehicleProps } from "../index.ts"

export interface MotorcycleProps {}

type Motorcycle = Thing & ProductProps & VehicleProps & MotorcycleProps

export default Motorcycle
