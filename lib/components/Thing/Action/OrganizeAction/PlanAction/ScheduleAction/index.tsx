import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PlanActionProps from "../../../../../../types/Thing/PlanAction/index.ts"
import type ScheduleActionProps from "../../../../../../types/Thing/ScheduleAction/index.ts"

import PlanAction from "./index.tsx"

// ScheduleAction adds no properties to the PlanAction schema type
export type Props = BaseComponentProps<
	ScheduleActionProps,
	"ScheduleAction",
	ExtractLevelProps<ScheduleActionProps, PlanActionProps>
>

export default function ScheduleAction({
	schemaType = "ScheduleAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<PlanAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
