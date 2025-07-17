import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AudienceProps from "../../../../../types/Thing/Audience/index.ts"
import type PeopleAudienceProps from "../../../../../types/Thing/PeopleAudience/index.ts"

import Audience from "../index.tsx"

export type Props = BaseComponentProps<
	PeopleAudienceProps,
	"PeopleAudience",
	ExtractLevelProps<PeopleAudienceProps, AudienceProps>
>

export default function PeopleAudience(
	{
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
	}: Props,
) {
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
