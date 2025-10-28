import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export type SearchResultsPageType = "SearchResultsPage"

export interface SearchResultsPageProps {
	"@type"?: SearchResultsPageType
}

type SearchResultsPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& SearchResultsPageProps

export default SearchResultsPage
