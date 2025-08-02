import type BaseProps from "../../../../../types/index.ts"
import type OfferShippingDetailsProps from "../../../../../types/Thing/Intangible/StructuredValue/OfferShippingDetails/index.ts"

import StructuredValue from "../index.tsx"

export type Props = OfferShippingDetailsProps & BaseProps

export default function OfferShippingDetails({
	deliveryTime,
	depth,
	doesNotShip,
	hasShippingService,
	height,
	shippingDestination,
	shippingLabel,
	shippingOrigin,
	shippingRate,
	shippingSettingsLink,
	transitTimeLabel,
	validForMemberTier,
	weight,
	width,
	_type = "OfferShippingDetails",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				deliveryTime,
				depth,
				doesNotShip,
				hasShippingService,
				height,
				shippingDestination,
				shippingLabel,
				shippingOrigin,
				shippingRate,
				shippingSettingsLink,
				transitTimeLabel,
				validForMemberTier,
				weight,
				width,
				...subtypeProperties,
			}}
		>
			{children}
		</StructuredValue>
	)
}
