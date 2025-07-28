import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../types/Thing/Organization/index.ts"
import type { LocalBusinessProps } from "../../../../types/Thing/Organization/LocalBusiness/index.ts"

import Organization from "../index.tsx"

export type Props = BaseComponentProps<
	LocalBusinessProps,
	"LocalBusiness",
	ExtractLevelProps<ThingProps, OrganizationProps>
>

export default function LocalBusiness({
	branchOf,
	currenciesAccepted,
	openingHours,
	paymentAccepted,
	priceRange,
	schemaType = "LocalBusiness",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Organization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				branchOf,
				currenciesAccepted,
				openingHours,
				paymentAccepted,
				priceRange,
				...subtypeProperties,
			}}
		/>
	)
}
