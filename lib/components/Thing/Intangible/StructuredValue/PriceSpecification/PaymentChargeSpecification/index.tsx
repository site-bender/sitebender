import type BaseProps from "../../../../../../types/index.ts"
import type { PaymentChargeSpecification as PaymentChargeSpecificationProps } from "../../../../../../types/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = PaymentChargeSpecificationProps & BaseProps

export default function PaymentChargeSpecification({
	_type = "PaymentChargeSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
