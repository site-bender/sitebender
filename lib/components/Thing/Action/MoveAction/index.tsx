import type BaseProps from "../../../../types/index.ts"
import type MoveActionProps from "../../../../types/Thing/Action/MoveAction/index.ts"

import Action from "../index.tsx"

export type Props = MoveActionProps & BaseProps

export default function MoveAction({
	fromLocation,
	toLocation,
	_type = "MoveAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				fromLocation,
				toLocation,
				...subtypeProperties,
			}}
		/>
	)
}
