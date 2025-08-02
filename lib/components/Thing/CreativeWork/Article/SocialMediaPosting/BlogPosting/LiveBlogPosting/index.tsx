import type BaseProps from "../../../../../../../types/index.ts"
import type LiveBlogPostingProps from "../../../../../../../types/Thing/CreativeWork/Article/SocialMediaPosting/BlogPosting/LiveBlogPosting/index.ts"

import BlogPosting from "../index.tsx"

export type Props = LiveBlogPostingProps & BaseProps

export default function LiveBlogPosting({
	coverageEndTime,
	coverageStartTime,
	liveBlogUpdate,
	_type = "LiveBlogPosting",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<BlogPosting
			{...props}
			_type={_type}
			subtypeProperties={{
				coverageEndTime,
				coverageStartTime,
				liveBlogUpdate,
				...subtypeProperties,
			}}
		>
			{children}
		</BlogPosting>
	)
}
