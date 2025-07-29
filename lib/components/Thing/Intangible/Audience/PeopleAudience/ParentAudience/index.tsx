import type BaseProps from "../../../../../../types/index.ts"
import type ParentAudienceProps from "../../../../../../types/Thing/Intangible/Audience/PeopleAudience/ParentAudience/index.ts"

import PeopleAudience from "../index.tsx"

export type Props = ParentAudienceProps & BaseProps

export default function ParentAudience({
	childMaxAge,
	childMinAge,
	_type = "ParentAudience",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PeopleAudience
			{...props}
			_type={_type}
			subtypeProperties={{
				childMaxAge,
				childMinAge,
				...subtypeProperties,
			}}
		/>
	)
}
