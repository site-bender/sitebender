import type BaseProps from "../../../../../types/index.ts"
import type { Blog as BlogProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = BlogProps & BaseProps

export default function Blog({
	_type = "Blog",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
