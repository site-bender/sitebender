import type BaseProps from "../../../../../types/index.ts"
import type WinActionProps from "../../../../../types/Thing/Action/AchieveAction/WinAction/index.ts"

import AchieveAction from "../index.tsx"

export type Props = WinActionProps & BaseProps

export default function WinAction({
	loser,
	_type = "WinAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AchieveAction
			{...props}
			_type={_type}
			subtypeProperties={{
				loser,
				...subtypeProperties,
			}}
		>
			{children}
		</AchieveAction>
	)
}
