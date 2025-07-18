import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type UserInteractionProps from "../../../../../types/Thing/UserInteraction/index.ts"
import type UserLikesProps from "../../../../../types/Thing/UserLikes/index.ts"

import UserInteraction from "../index.tsx"

// UserLikes adds no properties to the UserInteraction schema type
export type Props = BaseComponentProps<
	UserLikesProps,
	"UserLikes",
	ExtractLevelProps<UserLikesProps, UserInteractionProps>
>

export default function UserLikes({
	schemaType = "UserLikes",
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
