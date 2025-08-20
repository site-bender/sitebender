import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"
import type { HotelRoomType } from "./HotelRoom/index.ts"
import type { MeetingRoomType } from "./MeetingRoom/index.ts"

export type RoomType = "Room" | HotelRoomType | MeetingRoomType

export interface RoomProps {
	"@type"?: RoomType
}

type Room = Thing & PlaceProps & AccommodationProps & RoomProps

export default Room
