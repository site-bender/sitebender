import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type OrganizeActionProps from "../../../../../types/Thing/OrganizeAction/index.ts"
import type PlanActionProps from "../../../../../types/Thing/PlanAction/index.ts"

import OrganizeAction from "./index.tsx"

export type Props = BaseComponentProps<
	PlanActionProps,
	"PlanAction",
	ExtractLevelProps<PlanActionProps, OrganizeActionProps>
>

export default function PlanAction(
	{
		scheduledTime,
		schemaType = "PlanAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<OrganizeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				scheduledTime,
				...subtypeProperties,
			}}
		/>
	)
}
