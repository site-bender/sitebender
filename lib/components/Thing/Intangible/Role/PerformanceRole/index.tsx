import type BaseProps from "../../../../../types/index.ts"
import type { PerformanceRole as PerformanceRoleProps } from "../../../../../types/index.ts"

import Role from "../index.tsx"

export type Props = PerformanceRoleProps & BaseProps

export default function PerformanceRole({
	_type = "PerformanceRole",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
