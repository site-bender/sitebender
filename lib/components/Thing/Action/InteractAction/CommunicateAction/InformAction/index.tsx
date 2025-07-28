import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../../types/Thing/Action/index.ts"
import type { InteractActionProps } from "../../../../../../types/Thing/Action/InteractAction/index.ts"
import type { CommunicateActionProps } from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/index.ts"
import type { InformActionProps } from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/InformAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = BaseComponentProps<
	InformActionProps,
	"InformAction",
	ExtractLevelProps<ThingProps, ActionProps, InteractActionProps, CommunicateActionProps>
>

export default function InformAction({
	event,
	schemaType = "InformAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CommunicateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				event,
				...subtypeProperties,
			}}
		/>
	)
}
