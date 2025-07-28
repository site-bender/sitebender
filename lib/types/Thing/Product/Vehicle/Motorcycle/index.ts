import type Thing from "../../../index.ts"
import type { ProductProps } from "../../index.ts"
import type { VehicleProps } from "../index.ts"

import MotorcycleComponent from "../../../../../../components/Thing/Product/Vehicle/Motorcycle/index.tsx"

export interface MotorcycleProps {
}

type Motorcycle =
	& Thing
	& ProductProps
	& VehicleProps
	& MotorcycleProps

export default Motorcycle
