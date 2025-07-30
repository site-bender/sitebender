import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"

export interface RoomProps {
	"@type"?: "Room"}

type Room = Thing & PlaceProps & AccommodationProps & RoomProps

export default Room
