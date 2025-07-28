import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { EnergyEfficiencyEnumerationProps } from "../index.ts"

export interface EUEnergyEfficiencyEnumerationProps {}

type EUEnergyEfficiencyEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& EnergyEfficiencyEnumerationProps
	& EUEnergyEfficiencyEnumerationProps

export default EUEnergyEfficiencyEnumeration
