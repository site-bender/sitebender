import type BaseProps from "../../../../../types/index.ts"
import type UserCheckinsProps from "../../../../../types/Thing/Event/UserInteraction/UserCheckins/index.ts"

import UserInteraction from "../index.tsx"

export type Props = UserCheckinsProps & BaseProps

export default function UserCheckins({
	_type = "UserCheckins",
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
