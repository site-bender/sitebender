import type BaseProps from "../../../../../../types/index.ts"
import type { BoatReservation as BoatReservationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BoatReservationProps & BaseProps

export default function BoatReservation({
	_type = "BoatReservation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
