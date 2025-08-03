import type BaseProps from "../../../../../../types/index.ts"
import type { AutoRepair as AutoRepairProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AutoRepairProps & BaseProps

export default function AutoRepair({
	_type = "AutoRepair",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
