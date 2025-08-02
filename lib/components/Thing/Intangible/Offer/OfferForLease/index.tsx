import type BaseProps from "../../../../../types/index.ts"
import type OfferForLeaseProps from "../../../../../types/Thing/Intangible/Offer/OfferForLease/index.ts"

import Offer from "../index.tsx"

export type Props = OfferForLeaseProps & BaseProps

export default function OfferForLease({
	_type = "OfferForLease",
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
		>
			{children}
		</Offer>
	)
}
