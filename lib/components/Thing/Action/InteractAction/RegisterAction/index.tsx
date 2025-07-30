import type BaseProps from "../../../../../types/index.ts"
import type RegisterActionProps from "../../../../../types/Thing/Action/InteractAction/RegisterAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = RegisterActionProps & BaseProps

export default function RegisterAction({
	_type = "RegisterAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InteractAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</InteractAction>
	)
}
