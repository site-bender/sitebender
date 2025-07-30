import type BaseProps from "../../../../../types/index.ts"
import type OfferForPurchaseProps from "../../../../../types/Thing/Intangible/Offer/OfferForPurchase/index.ts"

import Offer from "../index.tsx"

export type Props = OfferForPurchaseProps & BaseProps

export default function OfferForPurchase({
	_type = "OfferForPurchase",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Offer
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Offer>
	)
}
