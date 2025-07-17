import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type UserCommentsProps from "../../../../../types/Thing/UserComments/index.ts"
import type UserInteractionProps from "../../../../../types/Thing/UserInteraction/index.ts"

import UserInteraction from "../index.tsx"

export type Props = BaseComponentProps<
	UserCommentsProps,
	"UserComments",
	ExtractLevelProps<UserCommentsProps, UserInteractionProps>
>

export default function UserComments(
	{
		commentText,
		commentTime,
		creator,
		discusses,
		replyToUrl,
		schemaType = "UserComments",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<UserInteraction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				commentText,
				commentTime,
				creator,
				discusses,
				replyToUrl,
				...subtypeProperties,
			}}
		/>
	)
}
