import type BaseProps from "../../../../../../types/index.ts"
import type AssignActionProps from "../../../../../../types/Thing/Action/OrganizeAction/AllocateAction/AssignAction/index.ts"

import AllocateAction from "../index.tsx"

export type Props = AssignActionProps & BaseProps

export default function AssignAction({
	_type = "AssignAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AllocateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
