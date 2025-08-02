import type BaseProps from "../../../../types/index.ts"
import type LocalBusinessProps from "../../../../types/Thing/Organization/LocalBusiness/index.ts"

import Organization from "../index.tsx"

export type Props = LocalBusinessProps & BaseProps

export default function LocalBusiness({
	branchOf,
	currenciesAccepted,
	openingHours,
	paymentAccepted,
	priceRange,
	_type = "LocalBusiness",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				branchOf,
				currenciesAccepted,
				openingHours,
				paymentAccepted,
				priceRange,
				...subtypeProperties,
			}}
		>
			{children}
		</Organization>
	)
}
