import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AggregateRatingProps from "../../../../../../types/Thing/AggregateRating/index.ts"
import type EmployerAggregateRatingProps from "../../../../../../types/Thing/EmployerAggregateRating/index.ts"

import AggregateRating from "../index.tsx"

// EmployerAggregateRating adds no properties to the AggregateRating schema type
export type Props = BaseComponentProps<
	EmployerAggregateRatingProps,
	"EmployerAggregateRating",
	ExtractLevelProps<EmployerAggregateRatingProps, AggregateRatingProps>
>

export default function EmployerAggregateRating({
	schemaType = "EmployerAggregateRating",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AggregateRating
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
