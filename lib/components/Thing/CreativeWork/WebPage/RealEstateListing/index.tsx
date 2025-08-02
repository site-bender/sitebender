import type BaseProps from "../../../../../types/index.ts"
import type RealEstateListingProps from "../../../../../types/Thing/CreativeWork/WebPage/RealEstateListing/index.ts"

import WebPage from "../index.tsx"

export type Props = RealEstateListingProps & BaseProps

export default function RealEstateListing({
	datePosted,
	leaseLength,
	_type = "RealEstateListing",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<WebPage
			{...props}
			_type={_type}
			subtypeProperties={{
				datePosted,
				leaseLength,
				...subtypeProperties,
			}}
		>
			{children}
		</WebPage>
	)
}
