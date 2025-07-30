import type BaseProps from "../../../../../types/index.ts"
import type LoseActionProps from "../../../../../types/Thing/Action/AchieveAction/LoseAction/index.ts"

import AchieveAction from "../index.tsx"

export type Props = LoseActionProps & BaseProps

export default function LoseAction({
	winner,
	_type = "LoseAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AchieveAction
			{...props}
			_type={_type}
			subtypeProperties={{
				winner,
				...subtypeProperties,
			}}
		>{children}</AchieveAction>
	)
}
