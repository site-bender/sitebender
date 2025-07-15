import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AggregateOfferProps from "../../../../../types/Thing/AggregateOffer/index.ts"
import type OfferProps from "../../../../../types/Thing/Offer/index.ts"

import Offer from "./index.tsx"

export type Props = BaseComponentProps<
	AggregateOfferProps,
	"AggregateOffer",
	ExtractLevelProps<AggregateOfferProps, OfferProps>
>

export default function AggregateOffer(
	{
		highPrice,
		lowPrice,
		offerCount,
		offers,
		schemaType = "AggregateOffer",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Offer
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				highPrice,
				lowPrice,
				offerCount,
				offers,
				...subtypeProperties,
			}}
		/>
	)
}
