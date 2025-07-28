import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import QuantityComponent from "../../../../../components/Thing/Intangible/Quantity/index.tsx"

export interface QuantityProps {
}

type Quantity =
	& Thing
	& IntangibleProps
	& QuantityProps

export default Quantity
