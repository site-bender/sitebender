import type BaseProps from "../../../../../types/index.ts"
import type { RentalCarReservation as RentalCarReservationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RentalCarReservationProps & BaseProps

export default function RentalCarReservation({
	_type = "RentalCarReservation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
