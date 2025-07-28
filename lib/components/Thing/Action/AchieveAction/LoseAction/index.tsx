import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { AchieveActionProps } from "../../../../../types/Thing/Action/AchieveAction/index.ts"
import type { LoseActionProps } from "../../../../../types/Thing/Action/AchieveAction/LoseAction/index.ts"

import AchieveAction from "../index.tsx"

export type Props = BaseComponentProps<
	LoseActionProps,
	"LoseAction",
	ExtractLevelProps<ThingProps, ActionProps, AchieveActionProps>
>

export default function LoseAction({
	winner,
	schemaType = "LoseAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<AchieveAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				winner,
				...subtypeProperties,
			}}
		/>
	)
}
