import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface QuantityProps {}

type Quantity = Thing & IntangibleProps & QuantityProps

export default Quantity
