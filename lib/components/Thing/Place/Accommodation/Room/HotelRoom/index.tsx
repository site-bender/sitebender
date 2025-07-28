import type BaseProps from "../../../../../../types/index.ts"
import type { HotelRoomProps } from "../../../../../../types/Thing/Place/Accommodation/Room/HotelRoom/index.ts"

import Room from "../index.tsx"

export type Props = HotelRoomProps & BaseProps

export default function HotelRoom({
	bed,
	occupancy,
	_type = "HotelRoom",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Room
			{...props}
			_type={_type}
			subtypeProperties={{
				bed,
				occupancy,
				...subtypeProperties,
			}}
		/>
	)
}
