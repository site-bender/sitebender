import type BaseProps from "../../../../types/index.ts"
import type ParcelDeliveryProps from "../../../../types/Thing/Intangible/ParcelDelivery/index.ts"

import Intangible from "../index.tsx"

export type Props = ParcelDeliveryProps & BaseProps

export default function ParcelDelivery({
	carrier,
	deliveryAddress,
	deliveryStatus,
	expectedArrivalFrom,
	expectedArrivalUntil,
	hasDeliveryMethod,
	itemShipped,
	originAddress,
	partOfOrder,
	provider,
	trackingNumber,
	trackingUrl,
	_type = "ParcelDelivery",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				carrier,
				deliveryAddress,
				deliveryStatus,
				expectedArrivalFrom,
				expectedArrivalUntil,
				hasDeliveryMethod,
				itemShipped,
				originAddress,
				partOfOrder,
				provider,
				trackingNumber,
				trackingUrl,
				...subtypeProperties,
			}}
		/>
	)
}
