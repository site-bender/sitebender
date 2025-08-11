import type BaseProps from "../../../../../../types/index.ts"
import type { EmployeeRole as EmployeeRoleProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = EmployeeRoleProps & BaseProps

export default function EmployeeRole({
	_type = "EmployeeRole",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
