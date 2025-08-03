import type BaseProps from "../../../../types/index.ts"
import type { PaymentMethod as PaymentMethodProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = PaymentMethodProps & BaseProps

export default function PaymentMethod({
	_type = "PaymentMethod",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
