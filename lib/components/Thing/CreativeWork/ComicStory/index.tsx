import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ComicStoryProps from "../../../../types/Thing/ComicStory/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	ComicStoryProps,
	"ComicStory",
	ExtractLevelProps<ComicStoryProps, CreativeWorkProps>
>

export default function ComicStory(
	{
		artist,
		colorist,
		inker,
		letterer,
		penciler,
		schemaType = "ComicStory",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
