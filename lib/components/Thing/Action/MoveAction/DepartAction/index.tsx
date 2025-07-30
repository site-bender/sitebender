import type BaseProps from "../../../../../types/index.ts"
import type DepartActionProps from "../../../../../types/Thing/Action/MoveAction/DepartAction/index.ts"

import MoveAction from "../index.tsx"

export type Props = DepartActionProps & BaseProps

export default function DepartAction({
	_type = "DepartAction",
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
		>{children}</MoveAction>
	)
}
