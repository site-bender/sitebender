import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { QuantityProps } from "../index.ts"

export interface MassProps {
}

type Mass =
	& Thing
	& IntangibleProps
	& QuantityProps
	& MassProps

export default Mass
