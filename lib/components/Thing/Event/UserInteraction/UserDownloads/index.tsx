import type BaseProps from "../../../../../types/index.ts"
import type UserDownloadsProps from "../../../../../types/Thing/Event/UserInteraction/UserDownloads/index.ts"

import UserInteraction from "../index.tsx"

export type Props = UserDownloadsProps & BaseProps

export default function UserDownloads({
	_type = "UserDownloads",
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
