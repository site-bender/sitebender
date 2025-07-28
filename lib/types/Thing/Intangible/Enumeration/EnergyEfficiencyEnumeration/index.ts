import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import EnergyEfficiencyEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/EnergyEfficiencyEnumeration/index.tsx"

export interface EnergyEfficiencyEnumerationProps {
}

type EnergyEfficiencyEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& EnergyEfficiencyEnumerationProps

export default EnergyEfficiencyEnumeration
