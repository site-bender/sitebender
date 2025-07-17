import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type EnergyEfficiencyEnumerationProps from "../../../../../../types/Thing/EnergyEfficiencyEnumeration/index.ts"
import type EnergyStarEnergyEfficiencyEnumerationProps from "../../../../../../types/Thing/EnergyStarEnergyEfficiencyEnumeration/index.ts"

import EnergyEfficiencyEnumeration from "../index.tsx"

// EnergyStarEnergyEfficiencyEnumeration adds no properties to the EnergyEfficiencyEnumeration schema type
export type Props = BaseComponentProps<
	EnergyStarEnergyEfficiencyEnumerationProps,
	"EnergyStarEnergyEfficiencyEnumeration",
	ExtractLevelProps<
		EnergyStarEnergyEfficiencyEnumerationProps,
		EnergyEfficiencyEnumerationProps
	>
>

export default function EnergyStarEnergyEfficiencyEnumeration({
	schemaType = "EnergyStarEnergyEfficiencyEnumeration",
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
