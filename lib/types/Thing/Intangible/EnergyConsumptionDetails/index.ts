import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type EUEnergyEfficiencyEnumeration from "../Enumeration/EnergyEfficiencyEnumeration/EUEnergyEfficiencyEnumeration/index.ts"
import type EnergyEfficiencyEnumeration from "../Enumeration/EnergyEfficiencyEnumeration/index.ts"

import EnergyConsumptionDetailsComponent from "../../../../../components/Thing/Intangible/EnergyConsumptionDetails/index.tsx"

export interface EnergyConsumptionDetailsProps {
	energyEfficiencyScaleMax?: EUEnergyEfficiencyEnumeration
	energyEfficiencyScaleMin?: EUEnergyEfficiencyEnumeration
	hasEnergyEfficiencyCategory?: EnergyEfficiencyEnumeration
}

type EnergyConsumptionDetails =
	& Thing
	& IntangibleProps
	& EnergyConsumptionDetailsProps

export default EnergyConsumptionDetails
