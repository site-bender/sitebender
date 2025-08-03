import type BaseProps from "../../../../../../types/index.ts"
import type { MeetingRoom as MeetingRoomProps } from "../../../../../../types/index.ts"

import Room from "../index.tsx"

export type Props = MeetingRoomProps & BaseProps

export default function MeetingRoom({
	_type = "MeetingRoom",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
