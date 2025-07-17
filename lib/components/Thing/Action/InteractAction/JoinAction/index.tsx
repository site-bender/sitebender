import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type InteractActionProps from "../../../../../types/Thing/InteractAction/index.ts"
import type JoinActionProps from "../../../../../types/Thing/JoinAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = BaseComponentProps<
	JoinActionProps,
	"JoinAction",
	ExtractLevelProps<JoinActionProps, InteractActionProps>
>

export default function JoinAction(
	{
		event,
		schemaType = "JoinAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<InteractAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				event,
				...subtypeProperties,
			}}
		/>
	)
}
