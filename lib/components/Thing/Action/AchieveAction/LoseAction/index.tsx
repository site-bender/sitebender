import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AchieveActionProps from "../../../../../types/Thing/AchieveAction/index.ts"
import type LoseActionProps from "../../../../../types/Thing/LoseAction/index.ts"

import AchieveAction from "../index.tsx"

export type Props = BaseComponentProps<
	LoseActionProps,
	"LoseAction",
	ExtractLevelProps<LoseActionProps, AchieveActionProps>
>

export default function LoseAction(
	{
		winner,
		schemaType = "LoseAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
