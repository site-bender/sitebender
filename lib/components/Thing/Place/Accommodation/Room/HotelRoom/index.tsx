import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { PlaceProps } from "../../../../../../types/Thing/Place/index.ts"
import type { AccommodationProps } from "../../../../../../types/Thing/Place/Accommodation/index.ts"
import type { RoomProps } from "../../../../../../types/Thing/Place/Accommodation/Room/index.ts"
import type { HotelRoomProps } from "../../../../../../types/Thing/Place/Accommodation/Room/HotelRoom/index.ts"

import Room from "../index.tsx"

export type Props = BaseComponentProps<
	HotelRoomProps,
	"HotelRoom",
	ExtractLevelProps<ThingProps, PlaceProps, AccommodationProps, RoomProps>
>

export default function HotelRoom({
	bed,
	occupancy,
	schemaType = "HotelRoom",
	subtypeProperties = {},
	...props
}): Props {
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
