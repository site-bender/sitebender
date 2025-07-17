import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type UserInteractionProps from "../../../../../types/Thing/UserInteraction/index.ts"
import type UserPageVisitsProps from "../../../../../types/Thing/UserPageVisits/index.ts"

import UserInteraction from "../index.tsx"

// UserPageVisits adds no properties to the UserInteraction schema type
export type Props = BaseComponentProps<
	UserPageVisitsProps,
	"UserPageVisits",
	ExtractLevelProps<UserPageVisitsProps, UserInteractionProps>
>

export default function UserPageVisits({
	schemaType = "UserPageVisits",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<UserInteraction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
