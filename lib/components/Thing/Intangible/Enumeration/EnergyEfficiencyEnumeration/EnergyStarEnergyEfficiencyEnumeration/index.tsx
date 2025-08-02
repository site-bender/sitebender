import type BaseProps from "../../../../../../types/index.ts"
import type EnergyStarEnergyEfficiencyEnumerationProps from "../../../../../../types/Thing/Intangible/Enumeration/EnergyEfficiencyEnumeration/EnergyStarEnergyEfficiencyEnumeration/index.ts"

import EnergyEfficiencyEnumeration from "../index.tsx"

export type Props = EnergyStarEnergyEfficiencyEnumerationProps & BaseProps

export default function EnergyStarEnergyEfficiencyEnumeration({
	_type = "EnergyStarEnergyEfficiencyEnumeration",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<EnergyEfficiencyEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</EnergyEfficiencyEnumeration>
	)
}
