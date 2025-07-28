import type BaseProps from "../../../../../../types/index.ts"
import type { EUEnergyEfficiencyEnumerationProps } from "../../../../../../types/Thing/Intangible/Enumeration/EnergyEfficiencyEnumeration/EUEnergyEfficiencyEnumeration/index.ts"

import EnergyEfficiencyEnumeration from "../index.tsx"

export type Props = EUEnergyEfficiencyEnumerationProps & BaseProps

export default function EUEnergyEfficiencyEnumeration({
	_type = "EUEnergyEfficiencyEnumeration",
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
		/>
	)
}
