import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type OfferShippingDetailsProps from "../../../../../types/Thing/OfferShippingDetails/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	OfferShippingDetailsProps,
	"OfferShippingDetails",
	ExtractLevelProps<OfferShippingDetailsProps, StructuredValueProps>
>

export default function OfferShippingDetails(
	{
		deliveryTime,
		depth,
		doesNotShip,
		hasShippingService,
		height,
		shippingDestination,
		shippingOrigin,
		shippingRate,
		validForMemberTier,
		weight,
		width,
		schemaType = "OfferShippingDetails",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
				shippingOrigin,
				shippingRate,
				validForMemberTier,
				weight,
				width,
				...subtypeProperties,
			}}
		/>
	)
}
