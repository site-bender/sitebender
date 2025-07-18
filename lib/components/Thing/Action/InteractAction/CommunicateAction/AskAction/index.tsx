import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AskActionProps from "../../../../../../types/Thing/AskAction/index.ts"
import type CommunicateActionProps from "../../../../../../types/Thing/CommunicateAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = BaseComponentProps<
	AskActionProps,
	"AskAction",
	ExtractLevelProps<AskActionProps, CommunicateActionProps>
>

export default function AskAction(
	{
		question,
		schemaType = "AskAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CommunicateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				question,
				...subtypeProperties,
			}}
		/>
	)
}
