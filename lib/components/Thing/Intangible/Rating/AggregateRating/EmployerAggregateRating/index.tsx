import type BaseProps from "../../../../../../types/index.ts"
import type EmployerAggregateRatingProps from "../../../../../../types/Thing/Intangible/Rating/AggregateRating/EmployerAggregateRating/index.ts"

import AggregateRating from "../index.tsx"

export type Props = EmployerAggregateRatingProps & BaseProps

export default function EmployerAggregateRating({
	_type = "EmployerAggregateRating",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AggregateRating
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
