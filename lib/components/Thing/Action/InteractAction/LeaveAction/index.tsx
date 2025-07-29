import type BaseProps from "../../../../../types/index.ts"
import type LeaveActionProps from "../../../../../types/Thing/Action/InteractAction/LeaveAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = LeaveActionProps & BaseProps

export default function LeaveAction({
	event,
	_type = "LeaveAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InteractAction
			{...props}
			_type={_type}
			subtypeProperties={{
				event,
				...subtypeProperties,
			}}
		/>
	)
}
