import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MediaReviewProps from "../../../../../types/Thing/MediaReview/index.ts"
import type ReviewProps from "../../../../../types/Thing/Review/index.ts"

import Review from "../index.tsx"

export type Props = BaseComponentProps<
	MediaReviewProps,
	"MediaReview",
	ExtractLevelProps<MediaReviewProps, ReviewProps>
>

export default function MediaReview(
	{
		mediaAuthenticityCategory,
		originalMediaContextDescription,
		originalMediaLink,
		schemaType = "MediaReview",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
