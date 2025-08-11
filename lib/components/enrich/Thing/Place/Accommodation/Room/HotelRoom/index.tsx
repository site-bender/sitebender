import type BaseProps from "../../../../../../types/index.ts"
import type { HotelRoom as HotelRoomProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = HotelRoomProps & BaseProps

export default function HotelRoom({
	_type = "HotelRoom",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
