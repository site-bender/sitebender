import type BaseProps from "../../../../../types/index.ts"
import type ReportProps from "../../../../../types/Thing/CreativeWork/Article/Report/index.ts"

import Article from "../index.tsx"

export type Props = ReportProps & BaseProps

export default function Report({
	reportNumber,
	_type = "Report",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Article
			{...props}
			_type={_type}
			subtypeProperties={{
				reportNumber,
				...subtypeProperties,
			}}
		>{children}</Article>
	)
}
