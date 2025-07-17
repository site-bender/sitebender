import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type SolveMathActionProps from "../../../../types/Thing/SolveMathAction/index.ts"

import Action from "../index.tsx"

export type Props = BaseComponentProps<
	SolveMathActionProps,
	"SolveMathAction",
	ExtractLevelProps<SolveMathActionProps, ActionProps>
>

export default function SolveMathAction(
	{
		eduQuestionType,
		schemaType = "SolveMathAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				eduQuestionType,
				...subtypeProperties,
			}}
		/>
	)
}
