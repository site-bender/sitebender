// Room extends Accommodation but adds no additional properties
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface RoomProps {}

type Room =
	& Thing
	& AccommodationProps
	& PlaceProps
	& RoomProps

export default Room
