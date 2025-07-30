import type BaseProps from "../../../../../types/index.ts"
import type RecommendationProps from "../../../../../types/Thing/CreativeWork/Review/Recommendation/index.ts"

import Review from "../index.tsx"

export type Props = RecommendationProps & BaseProps

export default function Recommendation({
	category,
	_type = "Recommendation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Review
			{...props}
			_type={_type}
			subtypeProperties={{
				category,
				...subtypeProperties,
			}}
		>{children}</Review>
	)
}
