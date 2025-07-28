import type BaseProps from "../../../../../../types/index.ts"
import type { DiscussionForumPostingProps } from "../../../../../../types/Thing/CreativeWork/Article/SocialMediaPosting/DiscussionForumPosting/index.ts"

import SocialMediaPosting from "../index.tsx"

export type Props = DiscussionForumPostingProps & BaseProps

export default function DiscussionForumPosting({
	_type = "DiscussionForumPosting",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SocialMediaPosting
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
