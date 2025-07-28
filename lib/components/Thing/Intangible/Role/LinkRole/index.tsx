import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { RoleProps } from "../../../../../types/Thing/Intangible/Role/index.ts"
import type { LinkRoleProps } from "../../../../../types/Thing/Intangible/Role/LinkRole/index.ts"

import Role from "../index.tsx"

export type Props = BaseComponentProps<
	LinkRoleProps,
	"LinkRole",
	ExtractLevelProps<ThingProps, IntangibleProps, RoleProps>
>

export default function LinkRole({
	inLanguage,
	linkRelationship,
	schemaType = "LinkRole",
	subtypeProperties = {},
	...props
}): Props {
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
