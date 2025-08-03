import type BaseProps from "../../../../../types/index.ts"
import type { TaxiReservation as TaxiReservationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TaxiReservationProps & BaseProps

export default function TaxiReservation({
	_type = "TaxiReservation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
