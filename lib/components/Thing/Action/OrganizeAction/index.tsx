import type BaseProps from "../../../../types/index.ts"
import type OrganizeActionProps from "../../../../types/Thing/Action/OrganizeAction/index.ts"

import Action from "../index.tsx"

export type Props = OrganizeActionProps & BaseProps

export default function OrganizeAction({
	_type = "OrganizeAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Action>
	)
}
