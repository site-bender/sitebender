import type BaseProps from "../../../../../types/index.ts"
import type { NewsArticle as NewsArticleProps } from "../../../../../types/index.ts"

import Article from "../index.tsx"

export type Props = NewsArticleProps & BaseProps

export default function NewsArticle({
	_type = "NewsArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
