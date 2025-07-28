import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface SaleEventProps {}

type SaleEvent = Thing & EventProps & SaleEventProps

export default SaleEvent
