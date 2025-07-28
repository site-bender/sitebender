import type BaseProps from "../../../../../types/index.ts"
import type { MediaReviewProps } from "../../../../../types/Thing/CreativeWork/Review/MediaReview/index.ts"

import Review from "../index.tsx"

export type Props = MediaReviewProps & BaseProps

export default function MediaReview({
	mediaAuthenticityCategory,
	originalMediaContextDescription,
	originalMediaLink,
	_type = "MediaReview",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Review
			{...props}
			_type={_type}
			subtypeProperties={{
				mediaAuthenticityCategory,
				originalMediaContextDescription,
				originalMediaLink,
				...subtypeProperties,
			}}
		/>
	)
}
