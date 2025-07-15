import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type EnergyEfficiencyEnumerationProps from "../../../../../../types/Thing/EnergyEfficiencyEnumeration/index.ts"
import type EUEnergyEfficiencyEnumerationProps from "../../../../../../types/Thing/EUEnergyEfficiencyEnumeration/index.ts"

import EnergyEfficiencyEnumeration from "./index.tsx"

// EUEnergyEfficiencyEnumeration adds no properties to the EnergyEfficiencyEnumeration schema type
export type Props = BaseComponentProps<
	EUEnergyEfficiencyEnumerationProps,
	"EUEnergyEfficiencyEnumeration",
	ExtractLevelProps<
		EUEnergyEfficiencyEnumerationProps,
		EnergyEfficiencyEnumerationProps
	>
>

export default function EUEnergyEfficiencyEnumeration({
	schemaType = "EUEnergyEfficiencyEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<EnergyEfficiencyEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
