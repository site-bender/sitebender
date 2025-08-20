import type BaseProps from "../../../../../types/index.ts"
import type { TechArticle as TechArticleProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TechArticleProps & BaseProps

export default function TechArticle({
	_type = "TechArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
