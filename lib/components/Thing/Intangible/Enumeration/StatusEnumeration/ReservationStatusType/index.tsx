import type BaseProps from "../../../../../../types/index.ts"
import type ReservationStatusTypeProps from "../../../../../../types/Thing/Intangible/Enumeration/StatusEnumeration/ReservationStatusType/index.ts"

import StatusEnumeration from "../index.tsx"

export type Props = ReservationStatusTypeProps & BaseProps

export default function ReservationStatusType({
	_type = "ReservationStatusType",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StatusEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</StatusEnumeration>
	)
}
