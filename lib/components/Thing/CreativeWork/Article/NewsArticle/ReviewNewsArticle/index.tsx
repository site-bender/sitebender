import type BaseProps from "../../../../../../types/index.ts"
import type { ReviewNewsArticle as ReviewNewsArticleProps } from "../../../../../../types/index.ts"

import NewsArticle from "../index.tsx"

export type Props = ReviewNewsArticleProps & BaseProps

export default function ReviewNewsArticle({
	_type = "ReviewNewsArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
