import type BaseProps from "../../../../../types/index.ts"
import type SearchResultsPageProps from "../../../../../types/Thing/CreativeWork/WebPage/SearchResultsPage/index.ts"

import WebPage from "../index.tsx"

export type Props = SearchResultsPageProps & BaseProps

export default function SearchResultsPage({
	_type = "SearchResultsPage",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<WebPage
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
