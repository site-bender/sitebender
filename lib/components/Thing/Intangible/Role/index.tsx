import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { RoleProps } from "../../../../types/Thing/Intangible/Role/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	RoleProps,
	"Role",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function Role({
	endDate,
	namedPosition,
	roleName,
	startDate,
	schemaType = "Role",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
