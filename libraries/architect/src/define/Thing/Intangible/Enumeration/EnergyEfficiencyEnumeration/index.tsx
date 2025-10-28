import type BaseProps from "../../../../../../types/index.ts"
import type { EnergyEfficiencyEnumeration as EnergyEfficiencyEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = EnergyEfficiencyEnumerationProps & BaseProps

export default function EnergyEfficiencyEnumeration({
	_type = "EnergyEfficiencyEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
