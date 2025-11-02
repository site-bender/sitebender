import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { QuantityProps } from "../index.ts"

export type MassType = "Mass"

export interface MassProps {
	"@type"?: MassType
}

type Mass = Thing & IntangibleProps & QuantityProps & MassProps

export default Mass
