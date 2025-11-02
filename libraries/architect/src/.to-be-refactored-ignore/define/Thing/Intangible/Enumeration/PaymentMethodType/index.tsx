import type BaseProps from "../../../../../../types/index.ts"
import type { PaymentMethodType as PaymentMethodTypeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PaymentMethodTypeProps & BaseProps

export default function PaymentMethodType({
	_type = "PaymentMethodType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
