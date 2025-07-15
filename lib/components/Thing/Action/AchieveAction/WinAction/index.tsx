import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AchieveActionProps from "../../../../../types/Thing/AchieveAction/index.ts"
import type WinActionProps from "../../../../../types/Thing/WinAction/index.ts"

import AchieveAction from "./index.tsx"

export type Props = BaseComponentProps<
	WinActionProps,
	"WinAction",
	ExtractLevelProps<WinActionProps, AchieveActionProps>
>

export default function WinAction(
	{
		loser,
		schemaType = "WinAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
