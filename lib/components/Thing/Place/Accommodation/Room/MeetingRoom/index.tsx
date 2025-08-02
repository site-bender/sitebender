import type BaseProps from "../../../../../../types/index.ts"
import type MeetingRoomProps from "../../../../../../types/Thing/Place/Accommodation/Room/MeetingRoom/index.ts"

import Room from "../index.tsx"

export type Props = MeetingRoomProps & BaseProps

export default function MeetingRoom({
	_type = "MeetingRoom",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Room
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Room>
	)
}
