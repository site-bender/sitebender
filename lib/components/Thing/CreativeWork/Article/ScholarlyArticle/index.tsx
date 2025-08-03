import type BaseProps from "../../../../../types/index.ts"
import type { ScholarlyArticle as ScholarlyArticleProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ScholarlyArticleProps & BaseProps

export default function ScholarlyArticle({
	_type = "ScholarlyArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
