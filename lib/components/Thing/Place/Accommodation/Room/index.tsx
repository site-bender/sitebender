import type BaseProps from "../../../../../types/index.ts"
import type RoomProps from "../../../../../types/Thing/Place/Accommodation/Room/index.ts"

import Accommodation from "../index.tsx"

export type Props = RoomProps & BaseProps

export default function Room({
	_type = "Room",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Accommodation
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
