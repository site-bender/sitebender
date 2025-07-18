import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type RecommendationProps from "../../../../../types/Thing/Recommendation/index.ts"
import type ReviewProps from "../../../../../types/Thing/Review/index.ts"

import Review from "../index.tsx"

export type Props = BaseComponentProps<
	RecommendationProps,
	"Recommendation",
	ExtractLevelProps<RecommendationProps, ReviewProps>
>

export default function Recommendation(
	{
		category,
		schemaType = "Recommendation",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Review
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				category,
				...subtypeProperties,
			}}
		/>
	)
}
