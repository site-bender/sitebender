import type BaseProps from "../../../../types/index.ts"
import type RoleProps from "../../../../types/Thing/Intangible/Role/index.ts"

import Intangible from "../index.tsx"

export type Props = RoleProps & BaseProps

export default function Role({
	endDate,
	namedPosition,
	roleName,
	startDate,
	_type = "Role",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				endDate,
				namedPosition,
				roleName,
				startDate,
				...subtypeProperties,
			}}
		/>
	)
}
