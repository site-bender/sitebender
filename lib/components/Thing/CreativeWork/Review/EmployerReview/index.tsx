import type BaseProps from "../../../../../types/index.ts"
import type EmployerReviewProps from "../../../../../types/Thing/CreativeWork/Review/EmployerReview/index.ts"

import Review from "../index.tsx"

export type Props = EmployerReviewProps & BaseProps

export default function EmployerReview({
	_type = "EmployerReview",
	children,
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
		>{children}</Review>
	)
}
