import type BaseProps from "../../../../../types/index.ts"
import type { CriticReviewProps } from "../../../../../types/Thing/CreativeWork/Review/CriticReview/index.ts"

import Review from "../index.tsx"

export type Props = CriticReviewProps & BaseProps

export default function CriticReview({
	_type = "CriticReview",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Review
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
