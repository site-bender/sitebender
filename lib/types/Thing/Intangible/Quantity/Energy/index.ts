import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { QuantityProps } from "../index.ts"

export type EnergyType = "Energy"

export interface EnergyProps {
	"@type"?: EnergyType
}

type Energy = Thing & IntangibleProps & QuantityProps & EnergyProps

export default Energy
