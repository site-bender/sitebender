import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { MediaReviewItemProps } from "../../../../types/Thing/CreativeWork/MediaReviewItem/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MediaReviewItemProps,
	"MediaReviewItem",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function MediaReviewItem({
	mediaItemAppearance,
	schemaType = "MediaReviewItem",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				mediaItemAppearance,
				...subtypeProperties,
			}}
		/>
	)
}
