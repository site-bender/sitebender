import type BaseProps from "../../../../../../types/index.ts"
import type { OpinionNewsArticle as OpinionNewsArticleProps } from "../../../../../../types/index.ts"

import NewsArticle from "../index.tsx"

export type Props = OpinionNewsArticleProps & BaseProps

export default function OpinionNewsArticle({
	_type = "OpinionNewsArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
