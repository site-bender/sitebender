import type BaseProps from "../../../../../../../../types/index.ts"
import type { LiveBlogPosting as LiveBlogPostingProps } from "../../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = LiveBlogPostingProps & BaseProps

export default function LiveBlogPosting({
	_type = "LiveBlogPosting",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
