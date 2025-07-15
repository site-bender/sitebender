import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type RealEstateListingProps from "../../../../../types/Thing/RealEstateListing/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "./index.tsx"

export type Props = BaseComponentProps<
	RealEstateListingProps,
	"RealEstateListing",
	ExtractLevelProps<RealEstateListingProps, WebPageProps>
>

export default function RealEstateListing(
	{
		datePosted,
		leaseLength,
		schemaType = "RealEstateListing",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
