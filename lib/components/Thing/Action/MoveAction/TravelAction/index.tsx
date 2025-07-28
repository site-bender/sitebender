import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { MoveActionProps } from "../../../../../types/Thing/Action/MoveAction/index.ts"
import type { TravelActionProps } from "../../../../../types/Thing/Action/MoveAction/TravelAction/index.ts"

import MoveAction from "../index.tsx"

export type Props = BaseComponentProps<
	TravelActionProps,
	"TravelAction",
	ExtractLevelProps<ThingProps, ActionProps, MoveActionProps>
>

export default function TravelAction({
	distance,
	schemaType = "TravelAction",
	subtypeProperties = {},
	...props
}): Props {
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
