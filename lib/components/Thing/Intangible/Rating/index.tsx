import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { RatingProps } from "../../../../types/Thing/Intangible/Rating/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	RatingProps,
	"Rating",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function Rating({
	author,
	bestRating,
	ratingExplanation,
	ratingValue,
	reviewAspect,
	worstRating,
	schemaType = "Rating",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				author,
				bestRating,
				ratingExplanation,
				ratingValue,
				reviewAspect,
				worstRating,
				...subtypeProperties,
			}}
		/>
	)
}
