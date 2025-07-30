import type BaseProps from "../../../../../types/index.ts"
import type ApplyActionProps from "../../../../../types/Thing/Action/OrganizeAction/ApplyAction/index.ts"

import OrganizeAction from "../index.tsx"

export type Props = ApplyActionProps & BaseProps

export default function ApplyAction({
	_type = "ApplyAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<OrganizeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</OrganizeAction>
	)
}
