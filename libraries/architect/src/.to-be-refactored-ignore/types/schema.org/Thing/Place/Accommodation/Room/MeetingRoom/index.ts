import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { AccommodationProps } from "../../index.ts"
import type { RoomProps } from "../index.ts"

export type MeetingRoomType = "MeetingRoom"

export interface MeetingRoomProps {
	"@type"?: MeetingRoomType
}

type MeetingRoom =
	& Thing
	& PlaceProps
	& AccommodationProps
	& RoomProps
	& MeetingRoomProps

export default MeetingRoom
