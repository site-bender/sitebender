import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MeetingRoomProps from "../../../../../../types/Thing/MeetingRoom/index.ts"
import type RoomProps from "../../../../../../types/Thing/Room/index.ts"

import Room from "./index.tsx"

// MeetingRoom adds no properties to the Room schema type
export type Props = BaseComponentProps<
	MeetingRoomProps,
	"MeetingRoom",
	ExtractLevelProps<MeetingRoomProps, RoomProps>
>

export default function MeetingRoom({
	schemaType = "MeetingRoom",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Room
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
