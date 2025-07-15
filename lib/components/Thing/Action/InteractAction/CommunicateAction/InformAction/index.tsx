import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CommunicateActionProps from "../../../../../../types/Thing/CommunicateAction/index.ts"
import type InformActionProps from "../../../../../../types/Thing/InformAction/index.ts"

import CommunicateAction from "./index.tsx"

export type Props = BaseComponentProps<
	InformActionProps,
	"InformAction",
	ExtractLevelProps<InformActionProps, CommunicateActionProps>
>

export default function InformAction(
	{
		event,
		schemaType = "InformAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
