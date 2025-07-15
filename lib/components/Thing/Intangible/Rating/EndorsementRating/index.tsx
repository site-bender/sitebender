import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EndorsementRatingProps from "../../../../../types/Thing/EndorsementRating/index.ts"
import type RatingProps from "../../../../../types/Thing/Rating/index.ts"

import Rating from "./index.tsx"

// EndorsementRating adds no properties to the Rating schema type
export type Props = BaseComponentProps<
	EndorsementRatingProps,
	"EndorsementRating",
	ExtractLevelProps<EndorsementRatingProps, RatingProps>
>

export default function EndorsementRating({
	schemaType = "EndorsementRating",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Rating
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
