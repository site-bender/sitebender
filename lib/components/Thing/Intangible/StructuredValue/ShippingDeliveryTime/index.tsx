import type BaseProps from "../../../../../types/index.ts"
import type ShippingDeliveryTimeProps from "../../../../../types/Thing/Intangible/StructuredValue/ShippingDeliveryTime/index.ts"

import StructuredValue from "../index.tsx"

export type Props = ShippingDeliveryTimeProps & BaseProps

export default function ShippingDeliveryTime({
	businessDays,
	cutoffTime,
	handlingTime,
	transitTime,
	_type = "ShippingDeliveryTime",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				businessDays,
				cutoffTime,
				handlingTime,
				transitTime,
				...subtypeProperties,
			}}
		>
			{children}
		</StructuredValue>
	)
}
