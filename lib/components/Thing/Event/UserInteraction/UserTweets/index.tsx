import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type UserInteractionProps from "../../../../../types/Thing/UserInteraction/index.ts"
import type UserTweetsProps from "../../../../../types/Thing/UserTweets/index.ts"

import UserInteraction from "../index.tsx"

// UserTweets adds no properties to the UserInteraction schema type
export type Props = BaseComponentProps<
	UserTweetsProps,
	"UserTweets",
	ExtractLevelProps<UserTweetsProps, UserInteractionProps>
>

export default function UserTweets({
	schemaType = "UserTweets",
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
