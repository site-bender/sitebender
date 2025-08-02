import type BaseProps from "../../../../../types/index.ts"
import type UserCommentsProps from "../../../../../types/Thing/Event/UserInteraction/UserComments/index.ts"

import UserInteraction from "../index.tsx"

export type Props = UserCommentsProps & BaseProps

export default function UserComments({
	commentText,
	commentTime,
	creator,
	discusses,
	replyToUrl,
	_type = "UserComments",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<UserInteraction
			{...props}
			_type={_type}
			subtypeProperties={{
				commentText,
				commentTime,
				creator,
				discusses,
				replyToUrl,
				...subtypeProperties,
			}}
		>
			{children}
		</UserInteraction>
	)
}
