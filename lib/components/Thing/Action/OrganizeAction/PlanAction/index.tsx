import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { OrganizeActionProps } from "../../../../../types/Thing/Action/OrganizeAction/index.ts"
import type { PlanActionProps } from "../../../../../types/Thing/Action/OrganizeAction/PlanAction/index.ts"

import OrganizeAction from "../index.tsx"

export type Props = BaseComponentProps<
	PlanActionProps,
	"PlanAction",
	ExtractLevelProps<ThingProps, ActionProps, OrganizeActionProps>
>

export default function PlanAction({
	scheduledTime,
	schemaType = "PlanAction",
	subtypeProperties = {},
	...props
}): Props {
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
