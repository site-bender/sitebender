import type BaseProps from "../../../../../types/index.ts"
import type { SocialMediaPosting as SocialMediaPostingProps } from "../../../../../types/index.ts"

import Article from "../index.tsx"

export type Props = SocialMediaPostingProps & BaseProps

export default function SocialMediaPosting({
	_type = "SocialMediaPosting",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
