import type BaseProps from "../../../../../types/index.ts"
import type { HealthPlanNetwork as HealthPlanNetworkProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = HealthPlanNetworkProps & BaseProps

export default function HealthPlanNetwork({
	_type = "HealthPlanNetwork",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
