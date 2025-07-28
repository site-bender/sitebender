import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../types/Thing/Action/index.ts"
import type { TransferActionProps } from "../../../../types/Thing/Action/TransferAction/index.ts"

import Action from "../index.tsx"

export type Props = BaseComponentProps<
	TransferActionProps,
	"TransferAction",
	ExtractLevelProps<ThingProps, ActionProps>
>

export default function TransferAction({
	fromLocation,
	toLocation,
	schemaType = "TransferAction",
	subtypeProperties = {},
	...props
}): Props {
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
