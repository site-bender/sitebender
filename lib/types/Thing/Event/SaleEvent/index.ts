import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type SaleEventType = "SaleEvent"

export interface SaleEventProps {
	"@type"?: SaleEventType
}

type SaleEvent = Thing & EventProps & SaleEventProps

export default SaleEvent
