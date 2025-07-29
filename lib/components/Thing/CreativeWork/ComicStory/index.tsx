import type BaseProps from "../../../../types/index.ts"
import type ComicStoryProps from "../../../../types/Thing/CreativeWork/ComicStory/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ComicStoryProps & BaseProps

export default function ComicStory({
	artist,
	colorist,
	inker,
	letterer,
	penciler,
	_type = "ComicStory",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				artist,
				colorist,
				inker,
				letterer,
				penciler,
				...subtypeProperties,
			}}
		/>
	)
}
