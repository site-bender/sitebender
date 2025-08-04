import type BaseProps from "../../../../../../types/index.ts"
import type { PaymentStatusType as PaymentStatusTypeProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = PaymentStatusTypeProps & BaseProps

export default function PaymentStatusType({
	_type = "PaymentStatusType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
