import type BaseProps from "../../../../../types/index.ts"
import type { UserLikesProps } from "../../../../../types/Thing/Event/UserInteraction/UserLikes/index.ts"

import UserInteraction from "../index.tsx"

export type Props = UserLikesProps & BaseProps

export default function UserLikes({
	_type = "UserLikes",
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
		/>
	)
}
