import type BaseProps from "../../../../../types/index.ts"
import type LinkRoleProps from "../../../../../types/Thing/Intangible/Role/LinkRole/index.ts"

import Role from "../index.tsx"

export type Props = LinkRoleProps & BaseProps

export default function LinkRole({
	inLanguage,
	linkRelationship,
	_type = "LinkRole",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Role
			{...props}
			_type={_type}
			subtypeProperties={{
				inLanguage,
				linkRelationship,
				...subtypeProperties,
			}}
		/>
	)
}
