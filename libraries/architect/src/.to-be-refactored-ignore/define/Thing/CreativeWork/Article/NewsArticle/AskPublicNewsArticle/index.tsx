import type BaseProps from "../../../../../../../types/index.ts"
import type { AskPublicNewsArticle as AskPublicNewsArticleProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AskPublicNewsArticleProps & BaseProps

export default function AskPublicNewsArticle({
	_type = "AskPublicNewsArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
