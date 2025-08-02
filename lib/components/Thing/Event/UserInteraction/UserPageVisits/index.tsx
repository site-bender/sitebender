import type BaseProps from "../../../../../types/index.ts"
import type UserPageVisitsProps from "../../../../../types/Thing/Event/UserInteraction/UserPageVisits/index.ts"

import UserInteraction from "../index.tsx"

export type Props = UserPageVisitsProps & BaseProps

export default function UserPageVisits({
	_type = "UserPageVisits",
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
