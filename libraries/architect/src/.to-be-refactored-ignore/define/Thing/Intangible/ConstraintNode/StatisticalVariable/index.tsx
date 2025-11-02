import type BaseProps from "../../../../../../types/index.ts"
import type { StatisticalVariable as StatisticalVariableProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = StatisticalVariableProps & BaseProps

export default function StatisticalVariable({
	_type = "StatisticalVariable",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
