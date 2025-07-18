import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type OrganizationRoleProps from "../../../../../types/Thing/OrganizationRole/index.ts"
import type RoleProps from "../../../../../types/Thing/Role/index.ts"

import Role from "../index.tsx"

export type Props = BaseComponentProps<
	OrganizationRoleProps,
	"OrganizationRole",
	ExtractLevelProps<OrganizationRoleProps, RoleProps>
>

export default function OrganizationRole(
	{
		numberedPosition,
		schemaType = "OrganizationRole",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
