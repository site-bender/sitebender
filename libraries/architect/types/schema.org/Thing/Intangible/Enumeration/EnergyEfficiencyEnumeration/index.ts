import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"
import type { EnergyStarEnergyEfficiencyEnumerationType } from "./EnergyStarEnergyEfficiencyEnumeration/index.ts"
import type { EUEnergyEfficiencyEnumerationType } from "./EUEnergyEfficiencyEnumeration/index.ts"

export type EnergyEfficiencyEnumerationType =
	| "EnergyEfficiencyEnumeration"
	| EnergyStarEnergyEfficiencyEnumerationType
	| EUEnergyEfficiencyEnumerationType

export interface EnergyEfficiencyEnumerationProps {
	"@type"?: EnergyEfficiencyEnumerationType
}

type EnergyEfficiencyEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& EnergyEfficiencyEnumerationProps

export default EnergyEfficiencyEnumeration
