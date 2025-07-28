import type BaseProps from "../../../../../../types/index.ts"
import type { BlogPostingProps } from "../../../../../../types/Thing/CreativeWork/Article/SocialMediaPosting/BlogPosting/index.ts"

import SocialMediaPosting from "../index.tsx"

export type Props = BlogPostingProps & BaseProps

export default function BlogPosting({
	_type = "BlogPosting",
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
