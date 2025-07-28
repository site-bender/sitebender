import type BaseProps from "../../../../../types/index.ts"
import type { TravelActionProps } from "../../../../../types/Thing/Action/MoveAction/TravelAction/index.ts"

import MoveAction from "../index.tsx"

export type Props = TravelActionProps & BaseProps

export default function TravelAction({
	distance,
	_type = "TravelAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MoveAction
			{...props}
			_type={_type}
			subtypeProperties={{
				distance,
				...subtypeProperties,
			}}
		/>
	)
}
