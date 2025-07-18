import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PlanActionProps from "../../../../../../types/Thing/PlanAction/index.ts"
import type ReserveActionProps from "../../../../../../types/Thing/ReserveAction/index.ts"

import PlanAction from "../index.tsx"

// ReserveAction adds no properties to the PlanAction schema type
export type Props = BaseComponentProps<
	ReserveActionProps,
	"ReserveAction",
	ExtractLevelProps<ReserveActionProps, PlanActionProps>
>

export default function ReserveAction({
	schemaType = "ReserveAction",
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
