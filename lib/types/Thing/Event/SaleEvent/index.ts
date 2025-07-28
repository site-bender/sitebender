import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import SaleEventComponent from "../../../../../components/Thing/Event/SaleEvent/index.tsx"

export interface SaleEventProps {
}

type SaleEvent =
	& Thing
	& EventProps
	& SaleEventProps

export default SaleEvent
