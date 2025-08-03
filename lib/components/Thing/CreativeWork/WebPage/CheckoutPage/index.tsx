import type BaseProps from "../../../../../types/index.ts"
import type { CheckoutPage as CheckoutPageProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CheckoutPageProps & BaseProps

export default function CheckoutPage({
	_type = "CheckoutPage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
