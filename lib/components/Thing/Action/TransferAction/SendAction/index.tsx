import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TransferActionProps } from "../../../../../types/Thing/Action/TransferAction/index.ts"
import type { SendActionProps } from "../../../../../types/Thing/Action/TransferAction/SendAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	SendActionProps,
	"SendAction",
	ExtractLevelProps<ThingProps, ActionProps, TransferActionProps>
>

export default function SendAction({
	deliveryMethod,
	recipient,
	schemaType = "SendAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<TransferAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				deliveryMethod,
				recipient,
				...subtypeProperties,
			}}
		/>
	)
}
