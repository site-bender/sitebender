import type BaseProps from "../../../../../types/index.ts"
import type { OrganizationRole as OrganizationRoleProps } from "../../../../../types/index.ts"

import Role from "../index.tsx"

export type Props = OrganizationRoleProps & BaseProps

export default function OrganizationRole({
	_type = "OrganizationRole",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
