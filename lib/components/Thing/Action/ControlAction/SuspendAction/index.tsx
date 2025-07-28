import type BaseProps from "../../../../../types/index.ts"
import type { SuspendActionProps } from "../../../../../types/Thing/Action/ControlAction/SuspendAction/index.ts"

import ControlAction from "../index.tsx"

export type Props = SuspendActionProps & BaseProps

export default function SuspendAction({
	_type = "SuspendAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ControlAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
