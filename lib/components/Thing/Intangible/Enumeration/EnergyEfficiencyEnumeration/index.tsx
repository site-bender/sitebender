import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnergyEfficiencyEnumerationProps from "../../../../../types/Thing/EnergyEfficiencyEnumeration/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "./index.tsx"

// EnergyEfficiencyEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	EnergyEfficiencyEnumerationProps,
	"EnergyEfficiencyEnumeration",
	ExtractLevelProps<EnergyEfficiencyEnumerationProps, EnumerationProps>
>

export default function EnergyEfficiencyEnumeration({
	schemaType = "EnergyEfficiencyEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
