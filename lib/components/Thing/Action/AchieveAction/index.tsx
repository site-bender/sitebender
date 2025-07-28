import type BaseProps from "../../../../types/index.ts"
import type { AchieveActionProps } from "../../../../types/Thing/Action/AchieveAction/index.ts"

import Action from "../index.tsx"

export type Props = AchieveActionProps & BaseProps

export default function AchieveAction({
	_type = "AchieveAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
