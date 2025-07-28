import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { InteractActionProps } from "../../../../../types/Thing/Action/InteractAction/index.ts"
import type { JoinActionProps } from "../../../../../types/Thing/Action/InteractAction/JoinAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = BaseComponentProps<
	JoinActionProps,
	"JoinAction",
	ExtractLevelProps<ThingProps, ActionProps, InteractActionProps>
>

export default function JoinAction({
	event,
	schemaType = "JoinAction",
	subtypeProperties = {},
	...props
}): Props {
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
