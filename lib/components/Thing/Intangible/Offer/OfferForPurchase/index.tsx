import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type OfferProps from "../../../../../types/Thing/Offer/index.ts"
import type OfferForPurchaseProps from "../../../../../types/Thing/OfferForPurchase/index.ts"

import Offer from "./index.tsx"

// OfferForPurchase adds no properties to the Offer schema type
export type Props = BaseComponentProps<
	OfferForPurchaseProps,
	"OfferForPurchase",
	ExtractLevelProps<OfferForPurchaseProps, OfferProps>
>

export default function OfferForPurchase({
	schemaType = "OfferForPurchase",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Offer
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
