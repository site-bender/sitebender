import type BaseProps from "../../../../../types/index.ts"
import type { FoodEstablishmentReservation as FoodEstablishmentReservationProps } from "../../../../../types/index.ts"

import Reservation from "../index.tsx"

export type Props = FoodEstablishmentReservationProps & BaseProps

export default function FoodEstablishmentReservation({
	_type = "FoodEstablishmentReservation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
