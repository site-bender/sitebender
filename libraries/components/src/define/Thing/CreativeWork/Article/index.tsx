import type BaseProps from "../../../../../types/index.ts"
import type { Article as ArticleProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ArticleProps & BaseProps

export default function Article({
	_type = "Article",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
