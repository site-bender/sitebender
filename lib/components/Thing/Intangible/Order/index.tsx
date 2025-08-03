import type BaseProps from "../../../../types/index.ts"
import type { Order as OrderProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = OrderProps & BaseProps

export default function Order({
	_type = "Order",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
