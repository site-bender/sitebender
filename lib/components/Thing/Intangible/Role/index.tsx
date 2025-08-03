import type BaseProps from "../../../../types/index.ts"
import type { Role as RoleProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = RoleProps & BaseProps

export default function Role({
	_type = "Role",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
