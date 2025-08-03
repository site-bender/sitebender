import type BaseProps from "../../../../../../types/index.ts"
import type { BlogPosting as BlogPostingProps } from "../../../../../../types/index.ts"

import SocialMediaPosting from "../index.tsx"

export type Props = BlogPostingProps & BaseProps

export default function BlogPosting({
	_type = "BlogPosting",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
