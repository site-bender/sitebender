import type BaseProps from "../../../../../types/index.ts"
import type EnergyEfficiencyEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/EnergyEfficiencyEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = EnergyEfficiencyEnumerationProps & BaseProps

export default function EnergyEfficiencyEnumeration({
	_type = "EnergyEfficiencyEnumeration",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Enumeration>
	)
}
