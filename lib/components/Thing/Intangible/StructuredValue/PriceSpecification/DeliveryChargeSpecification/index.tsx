import type BaseProps from "../../../../../../types/index.ts"
import type DeliveryChargeSpecificationProps from "../../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/DeliveryChargeSpecification/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = DeliveryChargeSpecificationProps & BaseProps

export default function DeliveryChargeSpecification({
	appliesToDeliveryMethod,
	areaServed,
	eligibleRegion,
	ineligibleRegion,
	_type = "DeliveryChargeSpecification",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PriceSpecification
			{...props}
			_type={_type}
			subtypeProperties={{
				appliesToDeliveryMethod,
				areaServed,
				eligibleRegion,
				ineligibleRegion,
				...subtypeProperties,
			}}
		>
			{children}
		</PriceSpecification>
	)
}
