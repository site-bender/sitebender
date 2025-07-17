import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type ParcelDeliveryProps from "../../../../types/Thing/ParcelDelivery/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	ParcelDeliveryProps,
	"ParcelDelivery",
	ExtractLevelProps<ParcelDeliveryProps, IntangibleProps>
>

export default function ParcelDelivery(
	{
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
		schemaType = "ParcelDelivery",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
