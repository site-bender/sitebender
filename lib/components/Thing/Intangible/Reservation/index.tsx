import type BaseProps from "../../../../types/index.ts"
import type { Reservation as ReservationProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = ReservationProps & BaseProps

export default function Reservation({
	_type = "Reservation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
