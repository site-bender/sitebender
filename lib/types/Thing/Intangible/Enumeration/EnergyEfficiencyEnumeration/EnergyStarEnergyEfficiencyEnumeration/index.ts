import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { EnergyEfficiencyEnumerationProps } from "../index.ts"

export interface EnergyStarEnergyEfficiencyEnumerationProps {
	"@type"?: "EnergyStarEnergyEfficiencyEnumeration"}

type EnergyStarEnergyEfficiencyEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& EnergyEfficiencyEnumerationProps
	& EnergyStarEnergyEfficiencyEnumerationProps

export default EnergyStarEnergyEfficiencyEnumeration
