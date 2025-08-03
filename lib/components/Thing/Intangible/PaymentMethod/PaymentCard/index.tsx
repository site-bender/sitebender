import type BaseProps from "../../../../../types/index.ts"
import type { PaymentCard as PaymentCardProps } from "../../../../../types/index.ts"

import PaymentMethod from "../index.tsx"

export type Props = PaymentCardProps & BaseProps

export default function PaymentCard({
	_type = "PaymentCard",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
