import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ArticleProps from "../../../../../types/Thing/Article/index.ts"
import type ReportProps from "../../../../../types/Thing/Report/index.ts"

import Article from "./index.tsx"

export type Props = BaseComponentProps<
	ReportProps,
	"Report",
	ExtractLevelProps<ReportProps, ArticleProps>
>

export default function Report(
	{
		reportNumber,
		schemaType = "Report",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Article
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				reportNumber,
				...subtypeProperties,
			}}
		/>
	)
}
