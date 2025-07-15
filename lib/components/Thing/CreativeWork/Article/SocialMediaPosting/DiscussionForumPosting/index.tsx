import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DiscussionForumPostingProps from "../../../../../../types/Thing/DiscussionForumPosting/index.ts"
import type SocialMediaPostingProps from "../../../../../../types/Thing/SocialMediaPosting/index.ts"

import SocialMediaPosting from "./index.tsx"

// DiscussionForumPosting adds no properties to the SocialMediaPosting schema type
export type Props = BaseComponentProps<
	DiscussionForumPostingProps,
	"DiscussionForumPosting",
	ExtractLevelProps<DiscussionForumPostingProps, SocialMediaPostingProps>
>

export default function DiscussionForumPosting({
	schemaType = "DiscussionForumPosting",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SocialMediaPosting
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
