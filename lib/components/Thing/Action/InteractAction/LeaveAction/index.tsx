import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type InteractActionProps from "../../../../../types/Thing/InteractAction/index.ts"
import type LeaveActionProps from "../../../../../types/Thing/LeaveAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = BaseComponentProps<
	LeaveActionProps,
	"LeaveAction",
	ExtractLevelProps<LeaveActionProps, InteractActionProps>
>

export default function LeaveAction(
	{
		event,
		schemaType = "LeaveAction",
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
