import type BaseProps from "../../../../types/index.ts"
import type { DemandProps } from "../../../../types/Thing/Intangible/Demand/index.ts"

import Intangible from "../index.tsx"

export type Props = DemandProps & BaseProps

export default function Demand({
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
	_type = "Demand",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
