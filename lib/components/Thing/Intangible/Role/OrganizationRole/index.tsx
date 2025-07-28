import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { RoleProps } from "../../../../../types/Thing/Intangible/Role/index.ts"
import type { OrganizationRoleProps } from "../../../../../types/Thing/Intangible/Role/OrganizationRole/index.ts"

import Role from "../index.tsx"

export type Props = BaseComponentProps<
	OrganizationRoleProps,
	"OrganizationRole",
	ExtractLevelProps<ThingProps, IntangibleProps, RoleProps>
>

export default function OrganizationRole({
	numberedPosition,
	schemaType = "OrganizationRole",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Role
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				numberedPosition,
				...subtypeProperties,
			}}
		/>
	)
}
