import type BaseProps from "../../../../../types/index.ts"
import type { PaymentService as PaymentServiceProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PaymentServiceProps & BaseProps

export default function PaymentService({
	_type = "PaymentService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
