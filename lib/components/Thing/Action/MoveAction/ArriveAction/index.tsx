import type BaseProps from "../../../../../types/index.ts"
import type ArriveActionProps from "../../../../../types/Thing/Action/MoveAction/ArriveAction/index.ts"

import MoveAction from "../index.tsx"

export type Props = ArriveActionProps & BaseProps

export default function ArriveAction({
	_type = "ArriveAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MoveAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</MoveAction>
	)
}
