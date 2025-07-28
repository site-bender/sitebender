import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { WebPageProps } from "../../../../../types/Thing/CreativeWork/WebPage/index.ts"
import type { RealEstateListingProps } from "../../../../../types/Thing/CreativeWork/WebPage/RealEstateListing/index.ts"

import WebPage from "../index.tsx"

export type Props = BaseComponentProps<
	RealEstateListingProps,
	"RealEstateListing",
	ExtractLevelProps<ThingProps, CreativeWorkProps, WebPageProps>
>

export default function RealEstateListing({
	datePosted,
	leaseLength,
	schemaType = "RealEstateListing",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<WebPage
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				datePosted,
				leaseLength,
				...subtypeProperties,
			}}
		/>
	)
}
