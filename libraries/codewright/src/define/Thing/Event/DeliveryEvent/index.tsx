import type BaseProps from "../../../../../types/index.ts"
import type { DeliveryEvent as DeliveryEventProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = DeliveryEventProps & BaseProps

export default function DeliveryEvent({
	_type = "DeliveryEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
