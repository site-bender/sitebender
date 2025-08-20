import type BaseProps from "../../../../../types/index.ts"
import type { AdvertiserContentArticle as AdvertiserContentArticleProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = AdvertiserContentArticleProps & BaseProps

export default function AdvertiserContentArticle({
	_type = "AdvertiserContentArticle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
