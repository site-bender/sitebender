import type BaseProps from "../../../../types/index.ts"
import type BlogProps from "../../../../types/Thing/CreativeWork/Blog/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BlogProps & BaseProps

export default function Blog({
	blogPost,
	blogPosts,
	issn,
	_type = "Blog",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				blogPost,
				blogPosts,
				issn,
				...subtypeProperties,
			}}
		/>
	)
}
