import type BaseProps from "../../../../../types/index.ts"
import type ActivateActionProps from "../../../../../types/Thing/Action/ControlAction/ActivateAction/index.ts"

import ControlAction from "../index.tsx"

export type Props = ActivateActionProps & BaseProps

export default function ActivateAction({
	_type = "ActivateAction",
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
