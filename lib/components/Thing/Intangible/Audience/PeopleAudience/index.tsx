import type BaseProps from "../../../../../types/index.ts"
import type PeopleAudienceProps from "../../../../../types/Thing/Intangible/Audience/PeopleAudience/index.ts"

import Audience from "../index.tsx"

export type Props = PeopleAudienceProps & BaseProps

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
	_type = "PeopleAudience",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Audience
			{...props}
			_type={_type}
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
		>{children}</Audience>
	)
}
