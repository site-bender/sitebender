import type BaseProps from "../../../../../types/index.ts"
import type PerformanceRoleProps from "../../../../../types/Thing/Intangible/Role/PerformanceRole/index.ts"

import Role from "../index.tsx"

export type Props = PerformanceRoleProps & BaseProps

export default function PerformanceRole({
	characterName,
	_type = "PerformanceRole",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Role
			{...props}
			_type={_type}
			subtypeProperties={{
				characterName,
				...subtypeProperties,
			}}
		>
			{children}
		</Role>
	)
}
