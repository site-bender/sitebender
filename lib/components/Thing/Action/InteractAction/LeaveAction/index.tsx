import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { InteractActionProps } from "../../../../../types/Thing/Action/InteractAction/index.ts"
import type { LeaveActionProps } from "../../../../../types/Thing/Action/InteractAction/LeaveAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = BaseComponentProps<
	LeaveActionProps,
	"LeaveAction",
	ExtractLevelProps<ThingProps, ActionProps, InteractActionProps>
>

export default function LeaveAction({
	event,
	schemaType = "LeaveAction",
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
