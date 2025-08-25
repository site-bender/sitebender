import type BaseProps from "../../../../../types/index.ts"
import type { ParcelDelivery as ParcelDeliveryProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ParcelDeliveryProps & BaseProps

export default function ParcelDelivery({
	_type = "ParcelDelivery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
