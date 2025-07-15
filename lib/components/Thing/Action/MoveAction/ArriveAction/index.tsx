import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ArriveActionProps from "../../../../../types/Thing/ArriveAction/index.ts"
import type MoveActionProps from "../../../../../types/Thing/MoveAction/index.ts"

import MoveAction from "./index.tsx"

// ArriveAction adds no properties to the MoveAction schema type
export type Props = BaseComponentProps<
	ArriveActionProps,
	"ArriveAction",
	ExtractLevelProps<ArriveActionProps, MoveActionProps>
>

export default function ArriveAction({
	schemaType = "ArriveAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MoveAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
