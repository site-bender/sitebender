import type BaseProps from "../../../../../../types/index.ts"
import type { ReportageNewsArticle as ReportageNewsArticleProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ReportageNewsArticleProps & BaseProps

export default function ReportageNewsArticle({
	_type = "ReportageNewsArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
