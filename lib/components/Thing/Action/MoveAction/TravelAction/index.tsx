import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MoveActionProps from "../../../../../types/Thing/MoveAction/index.ts"
import type TravelActionProps from "../../../../../types/Thing/TravelAction/index.ts"

import MoveAction from "./index.tsx"

export type Props = BaseComponentProps<
	TravelActionProps,
	"TravelAction",
	ExtractLevelProps<TravelActionProps, MoveActionProps>
>

export default function TravelAction(
	{
		distance,
		schemaType = "TravelAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MoveAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				distance,
				...subtypeProperties,
			}}
		/>
	)
}
