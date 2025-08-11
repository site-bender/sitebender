import type BaseProps from "../../../../../../types/index.ts"
import type { ReservationStatusType as ReservationStatusTypeProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ReservationStatusTypeProps & BaseProps

export default function ReservationStatusType({
	_type = "ReservationStatusType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
