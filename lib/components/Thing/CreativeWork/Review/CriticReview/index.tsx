import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CriticReviewProps from "../../../../../types/Thing/CriticReview/index.ts"
import type ReviewProps from "../../../../../types/Thing/Review/index.ts"

import Review from "./index.tsx"

// CriticReview adds no properties to the Review schema type
export type Props = BaseComponentProps<
	CriticReviewProps,
	"CriticReview",
	ExtractLevelProps<CriticReviewProps, ReviewProps>
>

export default function CriticReview({
	schemaType = "CriticReview",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Review
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
