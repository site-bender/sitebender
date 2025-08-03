import type BaseProps from "../../../../../types/index.ts"
import type { DeliveryMethod as DeliveryMethodProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = DeliveryMethodProps & BaseProps

export default function DeliveryMethod({
	_type = "DeliveryMethod",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
