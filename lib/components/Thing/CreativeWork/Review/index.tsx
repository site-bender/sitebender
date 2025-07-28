import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { ReviewProps } from "../../../../types/Thing/CreativeWork/Review/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	ReviewProps,
	"Review",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function Review({
	associatedClaimReview,
	associatedMediaReview,
	associatedReview,
	itemReviewed,
	negativeNotes,
	positiveNotes,
	reviewAspect,
	reviewBody,
	reviewRating,
	schemaType = "Review",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				associatedClaimReview,
				associatedMediaReview,
				associatedReview,
				itemReviewed,
				negativeNotes,
				positiveNotes,
				reviewAspect,
				reviewBody,
				reviewRating,
				...subtypeProperties,
			}}
		/>
	)
}
