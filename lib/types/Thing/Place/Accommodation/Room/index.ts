import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"

import RoomComponent from "../../../../../../components/Thing/Place/Accommodation/Room/index.tsx"

export interface RoomProps {
}

type Room =
	& Thing
	& PlaceProps
	& AccommodationProps
	& RoomProps

export default Room
