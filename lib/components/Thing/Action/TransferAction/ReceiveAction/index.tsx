import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ReceiveActionProps from "../../../../../types/Thing/ReceiveAction/index.ts"
import type TransferActionProps from "../../../../../types/Thing/TransferAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	ReceiveActionProps,
	"ReceiveAction",
	ExtractLevelProps<ReceiveActionProps, TransferActionProps>
>

export default function ReceiveAction(
	{
		deliveryMethod,
		sender,
		schemaType = "ReceiveAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
