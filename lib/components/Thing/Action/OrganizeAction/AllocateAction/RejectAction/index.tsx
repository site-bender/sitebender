import type BaseProps from "../../../../../../types/index.ts"
import type { RejectActionProps } from "../../../../../../types/Thing/Action/OrganizeAction/AllocateAction/RejectAction/index.ts"

import AllocateAction from "../index.tsx"

export type Props = RejectActionProps & BaseProps

export default function RejectAction({
	_type = "RejectAction",
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
