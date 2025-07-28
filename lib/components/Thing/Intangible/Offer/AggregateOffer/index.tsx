import type BaseProps from "../../../../../types/index.ts"
import type { AggregateOfferProps } from "../../../../../types/Thing/Intangible/Offer/AggregateOffer/index.ts"

import Offer from "../index.tsx"

export type Props = AggregateOfferProps & BaseProps

export default function AggregateOffer({
	highPrice,
	lowPrice,
	offerCount,
	offers,
	_type = "AggregateOffer",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Offer
			{...props}
			_type={_type}
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
