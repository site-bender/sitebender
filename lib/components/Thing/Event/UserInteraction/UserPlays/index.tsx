import type BaseProps from "../../../../../types/index.ts"
import type UserPlaysProps from "../../../../../types/Thing/Event/UserInteraction/UserPlays/index.ts"

import UserInteraction from "../index.tsx"

export type Props = UserPlaysProps & BaseProps

export default function UserPlays({
	_type = "UserPlays",
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
		>
			{children}
		</UserInteraction>
	)
}
