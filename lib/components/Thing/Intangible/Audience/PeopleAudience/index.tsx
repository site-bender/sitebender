import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { AudienceProps } from "../../../../../types/Thing/Intangible/Audience/index.ts"
import type { PeopleAudienceProps } from "../../../../../types/Thing/Intangible/Audience/PeopleAudience/index.ts"

import Audience from "../index.tsx"

export type Props = BaseComponentProps<
	PeopleAudienceProps,
	"PeopleAudience",
	ExtractLevelProps<ThingProps, IntangibleProps, AudienceProps>
>

export default function PeopleAudience({
	healthCondition,
	requiredGender,
	requiredMaxAge,
	requiredMinAge,
	suggestedAge,
	suggestedGender,
	suggestedMaxAge,
	suggestedMeasurement,
	suggestedMinAge,
	schemaType = "PeopleAudience",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Audience
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				healthCondition,
				requiredGender,
				requiredMaxAge,
				requiredMinAge,
				suggestedAge,
				suggestedGender,
				suggestedMaxAge,
				suggestedMeasurement,
				suggestedMinAge,
				...subtypeProperties,
			}}
		/>
	)
}
