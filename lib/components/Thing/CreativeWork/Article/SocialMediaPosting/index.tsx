import type BaseProps from "../../../../../types/index.ts"
import type SocialMediaPostingProps from "../../../../../types/Thing/CreativeWork/Article/SocialMediaPosting/index.ts"

import Article from "../index.tsx"

export type Props = SocialMediaPostingProps & BaseProps

export default function SocialMediaPosting({
	sharedContent,
	_type = "SocialMediaPosting",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Article
			{...props}
			_type={_type}
			subtypeProperties={{
				sharedContent,
				...subtypeProperties,
			}}
		>
			{children}
		</Article>
	)
}
