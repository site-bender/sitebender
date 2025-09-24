import type BaseProps from "../../../../../../types/index.ts"
import type { ShippingDeliveryTime as ShippingDeliveryTimeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ShippingDeliveryTimeProps & BaseProps

export default function ShippingDeliveryTime({
	_type = "ShippingDeliveryTime",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
