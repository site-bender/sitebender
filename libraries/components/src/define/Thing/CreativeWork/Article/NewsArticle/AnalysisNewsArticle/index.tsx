import type BaseProps from "../../../../../../../types/index.ts"
import type { AnalysisNewsArticle as AnalysisNewsArticleProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AnalysisNewsArticleProps & BaseProps

export default function AnalysisNewsArticle({
	_type = "AnalysisNewsArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
