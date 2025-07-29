import type BaseProps from "../../../../../types/index.ts"
import type TieActionProps from "../../../../../types/Thing/Action/AchieveAction/TieAction/index.ts"

import AchieveAction from "../index.tsx"

export type Props = TieActionProps & BaseProps

export default function TieAction({
	_type = "TieAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AchieveAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
