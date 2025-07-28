import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { AudienceProps } from "../../../../../../types/Thing/Intangible/Audience/index.ts"
import type { PeopleAudienceProps } from "../../../../../../types/Thing/Intangible/Audience/PeopleAudience/index.ts"
import type { ParentAudienceProps } from "../../../../../../types/Thing/Intangible/Audience/PeopleAudience/ParentAudience/index.ts"

import PeopleAudience from "../index.tsx"

export type Props = BaseComponentProps<
	ParentAudienceProps,
	"ParentAudience",
	ExtractLevelProps<ThingProps, IntangibleProps, AudienceProps, PeopleAudienceProps>
>

export default function ParentAudience({
	childMaxAge,
	childMinAge,
	schemaType = "ParentAudience",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<PeopleAudience
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				childMaxAge,
				childMinAge,
				...subtypeProperties,
			}}
		/>
	)
}
