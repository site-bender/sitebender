import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ReviewProps from "../../../../../types/Thing/Review/index.ts"
import type UserReviewProps from "../../../../../types/Thing/UserReview/index.ts"

import Review from "./index.tsx"

// UserReview adds no properties to the Review schema type
export type Props = BaseComponentProps<
	UserReviewProps,
	"UserReview",
	ExtractLevelProps<UserReviewProps, ReviewProps>
>

export default function UserReview({
	schemaType = "UserReview",
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
