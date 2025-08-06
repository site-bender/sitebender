import type Thing from "../../index.ts"
import type EUEnergyEfficiencyEnumeration from "../Enumeration/EnergyEfficiencyEnumeration/EUEnergyEfficiencyEnumeration/index.ts"
import type EnergyEfficiencyEnumeration from "../Enumeration/EnergyEfficiencyEnumeration/index.ts"
import type { IntangibleProps } from "../index.ts"

import { EUEnergyEfficiencyEnumeration as EUEnergyEfficiencyEnumerationComponent } from "../../../../../components/index.tsx"
import { EnergyEfficiencyEnumeration as EnergyEfficiencyEnumerationComponent } from "../../../../../components/index.tsx"

export type EnergyConsumptionDetailsType = "EnergyConsumptionDetails"

export interface EnergyConsumptionDetailsProps {
	"@type"?: EnergyConsumptionDetailsType
	energyEfficiencyScaleMax?:
		| EUEnergyEfficiencyEnumeration
		| ReturnType<typeof EUEnergyEfficiencyEnumerationComponent>
	energyEfficiencyScaleMin?:
		| EUEnergyEfficiencyEnumeration
		| ReturnType<typeof EUEnergyEfficiencyEnumerationComponent>
	hasEnergyEfficiencyCategory?:
		| EnergyEfficiencyEnumeration
		| ReturnType<typeof EnergyEfficiencyEnumerationComponent>
}

type EnergyConsumptionDetails =
	& Thing
	& IntangibleProps
	& EnergyConsumptionDetailsProps

export default EnergyConsumptionDetails
