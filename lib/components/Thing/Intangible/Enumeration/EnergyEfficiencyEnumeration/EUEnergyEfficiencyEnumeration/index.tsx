import type BaseProps from "../../../../../../types/index.ts"
import type { EUEnergyEfficiencyEnumeration as EUEnergyEfficiencyEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = EUEnergyEfficiencyEnumerationProps & BaseProps

export default function EUEnergyEfficiencyEnumeration({
	_type = "EUEnergyEfficiencyEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
