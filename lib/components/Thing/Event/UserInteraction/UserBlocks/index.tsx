import type BaseProps from "../../../../../types/index.ts"
import type UserBlocksProps from "../../../../../types/Thing/Event/UserInteraction/UserBlocks/index.ts"

import UserInteraction from "../index.tsx"

export type Props = UserBlocksProps & BaseProps

export default function UserBlocks({
	_type = "UserBlocks",
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
