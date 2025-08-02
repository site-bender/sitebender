import type BaseProps from "../../../../../types/index.ts"
import type ComicCoverArtProps from "../../../../../types/Thing/CreativeWork/ComicStory/ComicCoverArt/index.ts"

import ComicStory from "../index.tsx"

export type Props = ComicCoverArtProps & BaseProps

export default function ComicCoverArt({
	_type = "ComicCoverArt",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ComicStory
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</ComicStory>
	)
}
