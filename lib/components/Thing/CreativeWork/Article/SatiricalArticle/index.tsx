import type BaseProps from "../../../../../types/index.ts"
import type { SatiricalArticle as SatiricalArticleProps } from "../../../../../types/index.ts"

import Article from "../index.tsx"

export type Props = SatiricalArticleProps & BaseProps

export default function SatiricalArticle({
	_type = "SatiricalArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
