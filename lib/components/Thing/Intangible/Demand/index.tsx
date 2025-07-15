import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type DemandProps from "../../../../types/Thing/Demand/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	DemandProps,
	"Demand",
	ExtractLevelProps<DemandProps, IntangibleProps>
>

export default function Demand(
	{
		acceptedPaymentMethod,
		advanceBookingRequirement,
		areaServed,
		asin,
		availability,
		availabilityEnds,
		availabilityStarts,
		availableAtOrFrom,
		availableDeliveryMethod,
		businessFunction,
		deliveryLeadTime,
		eligibleCustomerType,
		eligibleDuration,
		eligibleQuantity,
		eligibleRegion,
		eligibleTransactionVolume,
		gtin,
		gtin12,
		gtin13,
		gtin14,
		gtin8,
		includesObject,
		ineligibleRegion,
		inventoryLevel,
		itemCondition,
		itemOffered,
		mpn,
		priceSpecification,
		seller,
		serialNumber,
		sku,
		validFrom,
		validThrough,
		warranty,
		schemaType = "Demand",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				acceptedPaymentMethod,
				advanceBookingRequirement,
				areaServed,
				asin,
				availability,
				availabilityEnds,
				availabilityStarts,
				availableAtOrFrom,
				availableDeliveryMethod,
				businessFunction,
				deliveryLeadTime,
				eligibleCustomerType,
				eligibleDuration,
				eligibleQuantity,
				eligibleRegion,
				eligibleTransactionVolume,
				gtin,
				gtin12,
				gtin13,
				gtin14,
				gtin8,
				includesObject,
				ineligibleRegion,
				inventoryLevel,
				itemCondition,
				itemOffered,
				mpn,
				priceSpecification,
				seller,
				serialNumber,
				sku,
				validFrom,
				validThrough,
				warranty,
				...subtypeProperties,
			}}
		/>
	)
}
