import type BaseProps from "../../../../../../types/index.ts"
import type { Room as RoomProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RoomProps & BaseProps

export default function Room({
	_type = "Room",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
