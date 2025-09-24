import type BaseProps from "../../../../../../types/index.ts"
import type { ShippingConditions as ShippingConditionsProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ShippingConditionsProps & BaseProps

export default function ShippingConditions({
	_type = "ShippingConditions",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
