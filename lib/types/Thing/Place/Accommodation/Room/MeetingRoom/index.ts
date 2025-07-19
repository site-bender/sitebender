// MeetingRoom extends Room but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { AccommodationProps } from "../../index.ts"
import type { RoomProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MeetingRoomProps {}

type MeetingRoom =
	& Thing
	& AccommodationProps
	& PlaceProps
	& RoomProps
	& MeetingRoomProps

export default MeetingRoom
