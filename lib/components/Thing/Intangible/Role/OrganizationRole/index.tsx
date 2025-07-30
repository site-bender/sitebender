import type BaseProps from "../../../../../types/index.ts"
import type OrganizationRoleProps from "../../../../../types/Thing/Intangible/Role/OrganizationRole/index.ts"

import Role from "../index.tsx"

export type Props = OrganizationRoleProps & BaseProps

export default function OrganizationRole({
	numberedPosition,
	_type = "OrganizationRole",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Role
			{...props}
			_type={_type}
			subtypeProperties={{
				numberedPosition,
				...subtypeProperties,
			}}
		>{children}</Role>
	)
}
