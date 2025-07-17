import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type SearchResultsPageProps from "../../../../../types/Thing/SearchResultsPage/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "../index.tsx"

// SearchResultsPage adds no properties to the WebPage schema type
export type Props = BaseComponentProps<
	SearchResultsPageProps,
	"SearchResultsPage",
	ExtractLevelProps<SearchResultsPageProps, WebPageProps>
>

export default function SearchResultsPage({
	schemaType = "SearchResultsPage",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<WebPage
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
