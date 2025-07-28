import type BaseProps from "../../../../../types/index.ts"
import type { UserReviewProps } from "../../../../../types/Thing/CreativeWork/Review/UserReview/index.ts"

import Review from "../index.tsx"

export type Props = UserReviewProps & BaseProps

export default function UserReview({
	_type = "UserReview",
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
