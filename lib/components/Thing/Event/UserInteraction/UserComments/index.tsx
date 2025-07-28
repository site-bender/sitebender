import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { EventProps } from "../../../../../types/Thing/Event/index.ts"
import type { UserInteractionProps } from "../../../../../types/Thing/Event/UserInteraction/index.ts"
import type { UserCommentsProps } from "../../../../../types/Thing/Event/UserInteraction/UserComments/index.ts"

import UserInteraction from "../index.tsx"

export type Props = BaseComponentProps<
	UserCommentsProps,
	"UserComments",
	ExtractLevelProps<ThingProps, EventProps, UserInteractionProps>
>

export default function UserComments({
	commentText,
	commentTime,
	creator,
	discusses,
	replyToUrl,
	schemaType = "UserComments",
	subtypeProperties = {},
	...props
}): Props {
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
