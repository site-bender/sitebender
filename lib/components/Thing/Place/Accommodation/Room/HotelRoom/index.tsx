import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HotelRoomProps from "../../../../../../types/Thing/HotelRoom/index.ts"
import type RoomProps from "../../../../../../types/Thing/Room/index.ts"

import Room from "../index.tsx"

export type Props = BaseComponentProps<
	HotelRoomProps,
	"HotelRoom",
	ExtractLevelProps<HotelRoomProps, RoomProps>
>

export default function HotelRoom(
	{
		bed,
		occupancy,
		schemaType = "HotelRoom",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Room
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				bed,
				occupancy,
				...subtypeProperties,
			}}
		/>
	)
}
