import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { ReviewProps } from "../../../../../types/Thing/CreativeWork/Review/index.ts"
import type { MediaReviewProps } from "../../../../../types/Thing/CreativeWork/Review/MediaReview/index.ts"

import Review from "../index.tsx"

export type Props = BaseComponentProps<
	MediaReviewProps,
	"MediaReview",
	ExtractLevelProps<ThingProps, CreativeWorkProps, ReviewProps>
>

export default function MediaReview({
	mediaAuthenticityCategory,
	originalMediaContextDescription,
	originalMediaLink,
	schemaType = "MediaReview",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Review
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				mediaAuthenticityCategory,
				originalMediaContextDescription,
				originalMediaLink,
				...subtypeProperties,
			}}
		/>
	)
}
