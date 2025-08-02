import type BaseProps from "../../../../types/index.ts"
import type ControlActionProps from "../../../../types/Thing/Action/ControlAction/index.ts"

import Action from "../index.tsx"

export type Props = ControlActionProps & BaseProps

export default function ControlAction({
	_type = "ControlAction",
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
		>
			{children}
		</Action>
	)
}
