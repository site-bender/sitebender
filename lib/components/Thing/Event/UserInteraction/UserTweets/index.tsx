import type BaseProps from "../../../../../types/index.ts"
import type UserTweetsProps from "../../../../../types/Thing/Event/UserInteraction/UserTweets/index.ts"

import UserInteraction from "../index.tsx"

export type Props = UserTweetsProps & BaseProps

export default function UserTweets({
	_type = "UserTweets",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<UserInteraction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</UserInteraction>
	)
}
