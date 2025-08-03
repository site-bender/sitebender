import type BaseProps from "../../../../../../types/index.ts"
import type { BackgroundNewsArticle as BackgroundNewsArticleProps } from "../../../../../../types/index.ts"

import NewsArticle from "../index.tsx"

export type Props = BackgroundNewsArticleProps & BaseProps

export default function BackgroundNewsArticle({
	_type = "BackgroundNewsArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
