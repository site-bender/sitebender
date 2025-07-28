import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { OfferShippingDetailsProps } from "../../../../../types/Thing/Intangible/StructuredValue/OfferShippingDetails/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	OfferShippingDetailsProps,
	"OfferShippingDetails",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

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
	schemaType = "OfferShippingDetails",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
		/>
	)
}
