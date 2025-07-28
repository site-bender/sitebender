import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TransferActionProps } from "../../../../../types/Thing/Action/TransferAction/index.ts"
import type { ReceiveActionProps } from "../../../../../types/Thing/Action/TransferAction/ReceiveAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	ReceiveActionProps,
	"ReceiveAction",
	ExtractLevelProps<ThingProps, ActionProps, TransferActionProps>
>

export default function ReceiveAction({
	deliveryMethod,
	sender,
	schemaType = "ReceiveAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<TransferAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				deliveryMethod,
				sender,
				...subtypeProperties,
			}}
		/>
	)
}
