import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CancelActionProps from "../../../../../../types/Thing/CancelAction/index.ts"
import type PlanActionProps from "../../../../../../types/Thing/PlanAction/index.ts"

import PlanAction from "./index.tsx"

// CancelAction adds no properties to the PlanAction schema type
export type Props = BaseComponentProps<
	CancelActionProps,
	"CancelAction",
	ExtractLevelProps<CancelActionProps, PlanActionProps>
>

export default function CancelAction({
	schemaType = "CancelAction",
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
