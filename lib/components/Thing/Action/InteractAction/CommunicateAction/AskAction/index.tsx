import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../../types/Thing/Action/index.ts"
import type { InteractActionProps } from "../../../../../../types/Thing/Action/InteractAction/index.ts"
import type { CommunicateActionProps } from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/index.ts"
import type { AskActionProps } from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/AskAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = BaseComponentProps<
	AskActionProps,
	"AskAction",
	ExtractLevelProps<ThingProps, ActionProps, InteractActionProps, CommunicateActionProps>
>

export default function AskAction({
	question,
	schemaType = "AskAction",
	subtypeProperties = {},
	...props
}): Props {
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
