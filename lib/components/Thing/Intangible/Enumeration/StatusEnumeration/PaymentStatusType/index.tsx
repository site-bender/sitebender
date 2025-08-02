import type BaseProps from "../../../../../../types/index.ts"
import type PaymentStatusTypeProps from "../../../../../../types/Thing/Intangible/Enumeration/StatusEnumeration/PaymentStatusType/index.ts"

import StatusEnumeration from "../index.tsx"

export type Props = PaymentStatusTypeProps & BaseProps

export default function PaymentStatusType({
	_type = "PaymentStatusType",
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
		>
			{children}
		</StatusEnumeration>
	)
}
