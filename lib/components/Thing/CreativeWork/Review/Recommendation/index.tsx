import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { ReviewProps } from "../../../../../types/Thing/CreativeWork/Review/index.ts"
import type { RecommendationProps } from "../../../../../types/Thing/CreativeWork/Review/Recommendation/index.ts"

import Review from "../index.tsx"

export type Props = BaseComponentProps<
	RecommendationProps,
	"Recommendation",
	ExtractLevelProps<ThingProps, CreativeWorkProps, ReviewProps>
>

export default function Recommendation({
	category,
	schemaType = "Recommendation",
	subtypeProperties = {},
	...props
}): Props {
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
