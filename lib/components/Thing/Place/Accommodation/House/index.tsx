import type BaseProps from "../../../../../types/index.ts"
import type HouseProps from "../../../../../types/Thing/Place/Accommodation/House/index.ts"

import Accommodation from "../index.tsx"

export type Props = HouseProps & BaseProps

export default function House({
	numberOfRooms,
	_type = "House",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Accommodation
			{...props}
			_type={_type}
			subtypeProperties={{
				numberOfRooms,
				...subtypeProperties,
			}}
		/>
	)
}
