import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { OfferProps } from "../../../../../types/Thing/Intangible/Offer/index.ts"
import type { AggregateOfferProps } from "../../../../../types/Thing/Intangible/Offer/AggregateOffer/index.ts"

import Offer from "../index.tsx"

export type Props = BaseComponentProps<
	AggregateOfferProps,
	"AggregateOffer",
	ExtractLevelProps<ThingProps, IntangibleProps, OfferProps>
>

export default function AggregateOffer({
	highPrice,
	lowPrice,
	offerCount,
	offers,
	schemaType = "AggregateOffer",
	subtypeProperties = {},
	...props
}): Props {
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
