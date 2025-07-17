import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type OfferProps from "../../../../../types/Thing/Offer/index.ts"
import type OfferForLeaseProps from "../../../../../types/Thing/OfferForLease/index.ts"

import Offer from "../index.tsx"

// OfferForLease adds no properties to the Offer schema type
export type Props = BaseComponentProps<
	OfferForLeaseProps,
	"OfferForLease",
	ExtractLevelProps<OfferForLeaseProps, OfferProps>
>

export default function OfferForLease({
	schemaType = "OfferForLease",
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
