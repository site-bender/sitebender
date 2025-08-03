import type BaseProps from "../../../../../../types/index.ts"
import type { EnergyStarEnergyEfficiencyEnumeration as EnergyStarEnergyEfficiencyEnumerationProps } from "../../../../../../types/index.ts"

import EnergyEfficiencyEnumeration from "../index.tsx"

export type Props = EnergyStarEnergyEfficiencyEnumerationProps & BaseProps

export default function EnergyStarEnergyEfficiencyEnumeration({
	_type = "EnergyStarEnergyEfficiencyEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
