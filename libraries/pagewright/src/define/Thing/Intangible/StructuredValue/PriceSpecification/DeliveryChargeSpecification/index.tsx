import type BaseProps from "../../../../../../../types/index.ts"
import type { DeliveryChargeSpecification as DeliveryChargeSpecificationProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DeliveryChargeSpecificationProps & BaseProps

export default function DeliveryChargeSpecification({
	_type = "DeliveryChargeSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
