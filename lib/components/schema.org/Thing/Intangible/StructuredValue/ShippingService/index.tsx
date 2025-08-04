import type BaseProps from "../../../../../types/index.ts"
import type { ShippingService as ShippingServiceProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ShippingServiceProps & BaseProps

export default function ShippingService({
	_type = "ShippingService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
