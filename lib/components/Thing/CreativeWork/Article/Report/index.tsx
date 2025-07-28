import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { ArticleProps } from "../../../../../types/Thing/CreativeWork/Article/index.ts"
import type { ReportProps } from "../../../../../types/Thing/CreativeWork/Article/Report/index.ts"

import Article from "../index.tsx"

export type Props = BaseComponentProps<
	ReportProps,
	"Report",
	ExtractLevelProps<ThingProps, CreativeWorkProps, ArticleProps>
>

export default function Report({
	reportNumber,
	schemaType = "Report",
	subtypeProperties = {},
	...props
}): Props {
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
