import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LinkRoleProps from "../../../../../types/Thing/LinkRole/index.ts"
import type RoleProps from "../../../../../types/Thing/Role/index.ts"

import Role from "../index.tsx"

export type Props = BaseComponentProps<
	LinkRoleProps,
	"LinkRole",
	ExtractLevelProps<LinkRoleProps, RoleProps>
>

export default function LinkRole(
	{
		inLanguage,
		linkRelationship,
		schemaType = "LinkRole",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Role
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				inLanguage,
				linkRelationship,
				...subtypeProperties,
			}}
		/>
	)
}
