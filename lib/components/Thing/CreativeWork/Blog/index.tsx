import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { BlogProps } from "../../../../types/Thing/CreativeWork/Blog/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	BlogProps,
	"Blog",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function Blog({
	blogPost,
	blogPosts,
	issn,
	schemaType = "Blog",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				blogPost,
				blogPosts,
				issn,
				...subtypeProperties,
			}}
		/>
	)
}
