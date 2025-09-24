import type BaseProps from "../../../../../../../types/index.ts"
import type { DiscussionForumPosting as DiscussionForumPostingProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DiscussionForumPostingProps & BaseProps

export default function DiscussionForumPosting({
	_type = "DiscussionForumPosting",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
