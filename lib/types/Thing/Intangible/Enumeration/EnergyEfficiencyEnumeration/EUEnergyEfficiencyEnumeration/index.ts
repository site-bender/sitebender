import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { EnergyEfficiencyEnumerationProps } from "../index.ts"

export type EUEnergyEfficiencyEnumerationType = "EUEnergyEfficiencyEnumeration"

export interface EUEnergyEfficiencyEnumerationProps {
	"@type"?: EUEnergyEfficiencyEnumerationType
}

type EUEnergyEfficiencyEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& EnergyEfficiencyEnumerationProps
	& EUEnergyEfficiencyEnumerationProps

export default EUEnergyEfficiencyEnumeration
