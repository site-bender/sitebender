import type BaseProps from "../../../../../../types/index.ts"
import type { OrderAction as OrderActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = OrderActionProps & BaseProps

export default function OrderAction({
	_type = "OrderAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
