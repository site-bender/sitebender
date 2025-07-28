import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { QuantityProps } from "../index.ts"

import EnergyComponent from "../../../../../../components/Thing/Intangible/Quantity/Energy/index.tsx"

export interface EnergyProps {
}

type Energy =
	& Thing
	& IntangibleProps
	& QuantityProps
	& EnergyProps

export default Energy
