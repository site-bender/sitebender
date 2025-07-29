import type BaseProps from "../../../../../types/index.ts"
import type DeactivateActionProps from "../../../../../types/Thing/Action/ControlAction/DeactivateAction/index.ts"

import ControlAction from "../index.tsx"

export type Props = DeactivateActionProps & BaseProps

export default function DeactivateAction({
	_type = "DeactivateAction",
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
