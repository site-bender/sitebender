import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EmployerReviewProps from "../../../../../types/Thing/EmployerReview/index.ts"
import type ReviewProps from "../../../../../types/Thing/Review/index.ts"

import Review from "./index.tsx"

// EmployerReview adds no properties to the Review schema type
export type Props = BaseComponentProps<
	EmployerReviewProps,
	"EmployerReview",
	ExtractLevelProps<EmployerReviewProps, ReviewProps>
>

export default function EmployerReview({
	schemaType = "EmployerReview",
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
