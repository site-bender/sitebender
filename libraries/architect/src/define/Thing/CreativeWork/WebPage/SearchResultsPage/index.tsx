import type BaseProps from "../../../../../../types/index.ts"
import type { SearchResultsPage as SearchResultsPageProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SearchResultsPageProps & BaseProps

export default function SearchResultsPage({
	_type = "SearchResultsPage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
