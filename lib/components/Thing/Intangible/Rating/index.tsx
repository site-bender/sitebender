import type BaseProps from "../../../../types/index.ts"
import type { RatingProps } from "../../../../types/Thing/Intangible/Rating/index.ts"

import Intangible from "../index.tsx"

export type Props = RatingProps & BaseProps

export default function Rating({
	author,
	bestRating,
	ratingExplanation,
	ratingValue,
	reviewAspect,
	worstRating,
	_type = "Rating",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
