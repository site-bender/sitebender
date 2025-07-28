import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { AccommodationProps } from "../../index.ts"
import type { RoomProps } from "../index.ts"

import MeetingRoomComponent from "../../../../../../../components/Thing/Place/Accommodation/Room/MeetingRoom/index.tsx"

export interface MeetingRoomProps {
}

type MeetingRoom =
	& Thing
	& PlaceProps
	& AccommodationProps
	& RoomProps
	& MeetingRoomProps

export default MeetingRoom
