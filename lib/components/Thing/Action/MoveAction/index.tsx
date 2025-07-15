import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type MoveActionProps from "../../../../types/Thing/MoveAction/index.ts"

import Action from "./index.tsx"

export type Props = BaseComponentProps<
	MoveActionProps,
	"MoveAction",
	ExtractLevelProps<MoveActionProps, ActionProps>
>

export default function MoveAction(
	{
		fromLocation,
		toLocation,
		schemaType = "MoveAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				fromLocation,
				toLocation,
				...subtypeProperties,
			}}
		/>
	)
}
