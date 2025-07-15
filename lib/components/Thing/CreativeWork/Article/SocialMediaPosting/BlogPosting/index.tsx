import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BlogPostingProps from "../../../../../../types/Thing/BlogPosting/index.ts"
import type SocialMediaPostingProps from "../../../../../../types/Thing/SocialMediaPosting/index.ts"

import SocialMediaPosting from "./index.tsx"

// BlogPosting adds no properties to the SocialMediaPosting schema type
export type Props = BaseComponentProps<
	BlogPostingProps,
	"BlogPosting",
	ExtractLevelProps<BlogPostingProps, SocialMediaPostingProps>
>

export default function BlogPosting({
	schemaType = "BlogPosting",
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
