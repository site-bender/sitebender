import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type PerformanceRoleProps from "../../../../../types/Thing/PerformanceRole/index.ts"
import type RoleProps from "../../../../../types/Thing/Role/index.ts"

import Role from "../index.tsx"

export type Props = BaseComponentProps<
	PerformanceRoleProps,
	"PerformanceRole",
	ExtractLevelProps<PerformanceRoleProps, RoleProps>
>

export default function PerformanceRole(
	{
		characterName,
		schemaType = "PerformanceRole",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Role
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				characterName,
				...subtypeProperties,
			}}
		/>
	)
}
