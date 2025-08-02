import type BaseProps from "../../../../../types/index.ts"
import type UserPlusOnesProps from "../../../../../types/Thing/Event/UserInteraction/UserPlusOnes/index.ts"

import UserInteraction from "../index.tsx"

export type Props = UserPlusOnesProps & BaseProps

export default function UserPlusOnes({
	_type = "UserPlusOnes",
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
