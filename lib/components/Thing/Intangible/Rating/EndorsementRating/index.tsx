import type BaseProps from "../../../../../types/index.ts"
import type EndorsementRatingProps from "../../../../../types/Thing/Intangible/Rating/EndorsementRating/index.ts"

import Rating from "../index.tsx"

export type Props = EndorsementRatingProps & BaseProps

export default function EndorsementRating({
	_type = "EndorsementRating",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Rating
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
