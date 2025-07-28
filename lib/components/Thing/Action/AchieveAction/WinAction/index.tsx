import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { AchieveActionProps } from "../../../../../types/Thing/Action/AchieveAction/index.ts"
import type { WinActionProps } from "../../../../../types/Thing/Action/AchieveAction/WinAction/index.ts"

import AchieveAction from "../index.tsx"

export type Props = BaseComponentProps<
	WinActionProps,
	"WinAction",
	ExtractLevelProps<ThingProps, ActionProps, AchieveActionProps>
>

export default function WinAction({
	loser,
	schemaType = "WinAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<AchieveAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				loser,
				...subtypeProperties,
			}}
		/>
	)
}
