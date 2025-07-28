import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { RoleProps } from "../../../../../types/Thing/Intangible/Role/index.ts"
import type { PerformanceRoleProps } from "../../../../../types/Thing/Intangible/Role/PerformanceRole/index.ts"

import Role from "../index.tsx"

export type Props = BaseComponentProps<
	PerformanceRoleProps,
	"PerformanceRole",
	ExtractLevelProps<ThingProps, IntangibleProps, RoleProps>
>

export default function PerformanceRole({
	characterName,
	schemaType = "PerformanceRole",
	subtypeProperties = {},
	...props
}): Props {
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
