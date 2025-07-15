import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ParentAudienceProps from "../../../../../../types/Thing/ParentAudience/index.ts"
import type PeopleAudienceProps from "../../../../../../types/Thing/PeopleAudience/index.ts"

import PeopleAudience from "./index.tsx"

export type Props = BaseComponentProps<
	ParentAudienceProps,
	"ParentAudience",
	ExtractLevelProps<ParentAudienceProps, PeopleAudienceProps>
>

export default function ParentAudience(
	{
		childMaxAge,
		childMinAge,
		schemaType = "ParentAudience",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
